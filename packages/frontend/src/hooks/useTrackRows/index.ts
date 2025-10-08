import { useState, useCallback } from 'react';
import { produce, type Draft } from 'immer';
import { BaseTrackingAction } from '@api';

export interface TrackRow<T> {
  data: T;
  action: BaseTrackingAction | 'NONE';
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export function useTrackRows<T extends { id: string | number }>(
  initialRows: T[],
) {
  const [rows, setRows] = useState<TrackRow<T>[]>(() =>
    initialRows.map((row) => ({
      action: 'NONE',
      data: row,
    })),
  );

  // Thêm row mới
  const addRow = useCallback((newRow: T) => {
    setRows((prev) =>
      produce(prev, (draft) => {
        const maxId = Math.max(...draft.map((r) => Number(r.data.id)));
        draft.push({
          action: BaseTrackingAction.create,
          data: { ...newRow, id: maxId + 1 } as Draft<T>,
        });
      }),
    );
  }, []);

  // Cập nhật row
  const updateRow = useCallback(
    (id: string | number, updatedData: DeepPartial<T>) => {
      setRows((prev) =>
        produce(prev, (draft) => {
          const row = draft.find((r) => r.data.id === id);
          if (row) {
            row.data = { ...row.data, ...updatedData } as Draft<T>;
            if (row.action !== BaseTrackingAction.create) {
              row.action = BaseTrackingAction.update;
            }
          }
        }),
      );
    },
    [],
  );

  // Xóa row
  const deleteRow = useCallback((id: string | number) => {
    setRows((prev) =>
      produce(prev, (draft) => {
        const idx = draft.findIndex((r) => r.data.id === id);
        if (idx !== -1) {
          if (draft[idx].action === BaseTrackingAction.create) {
            // Nếu là row mới thì xóa luôn
            draft.splice(idx, 1);
          } else {
            // Nếu row có trong DB thì đánh dấu DEL
            draft[idx].action = BaseTrackingAction.delete;
          }
        }
      }),
    );
  }, []);

  // Khôi phục row đã xóa
  const restoreRow = useCallback((id: string | number) => {
    setRows((prev) =>
      produce(prev, (draft) => {
        const row = draft.find((r) => r.data.id === id);
        if (row && row.action === BaseTrackingAction.delete) {
          row.action = 'NONE';
        }
        if (row && row.action === BaseTrackingAction.update) {
          row.action = 'NONE';
        }
      }),
    );
  }, []);

  // Reset toàn bộ data
  const reset = useCallback((data: T[]) => {
    setRows(data.map((item) => ({ data: item, action: 'NONE' })));
  }, []);

  // Lấy danh sách thay đổi
  const getChanges = useCallback(() => {
    return rows.filter((r) => r.action !== 'NONE');
  }, [rows]);

  return {
    rows,
    addRow,
    updateRow,
    deleteRow,
    restoreRow,
    reset,
    getChanges,
    setRows,
  };
}
