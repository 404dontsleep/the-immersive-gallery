import type { Permission } from '@api';
import type { PermissionRelationsDto } from '@api';
import { usePermissionControllerFindAll } from '@api';
import { usePermissionControllerFindAllWithRelations } from '@api';
import { useMemo } from 'react';

export interface PermissionTreeNode {
  id: number;
  name: string;
  description: string;
  children: PermissionTreeNode[];
}

export function buildTreeData(
  permissions: Permission[],
  relations: PermissionRelationsDto[],
): PermissionTreeNode[] {
  // Map để tìm nhanh permission theo id
  const map = new Map<number, PermissionTreeNode>();

  // Khởi tạo node rỗng
  permissions.forEach((p) => {
    map.set(p.id, {
      id: p.id,
      name: p.name,
      description: p.description,
      children: [],
    });
  });

  const roots: PermissionTreeNode[] = [];

  // Gắn quan hệ cha-con
  relations.forEach((rel) => {
    const node = map.get(rel.id);
    if (!node) return;

    if (rel.parents.length === 0) {
      // Nếu không có cha thì là root
      roots.push(node);
    } else {
      rel.parents.forEach((parent) => {
        const parentNode = map.get(parent.id);
        if (parentNode) {
          parentNode.children.push(node);
        }
      });
    }
  });

  return roots;
}

export default function usePermissionTree() {
  const { data: permissions } = usePermissionControllerFindAll();
  const { data: permissionsWithRelations } =
    usePermissionControllerFindAllWithRelations();
  return useMemo(() => {
    if (!permissions || !permissionsWithRelations) return [];
    return buildTreeData(permissions, permissionsWithRelations);
  }, [permissions, permissionsWithRelations]);
}
