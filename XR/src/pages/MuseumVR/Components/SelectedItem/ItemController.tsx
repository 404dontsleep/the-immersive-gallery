import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Group, Mesh, Quaternion, Vector3, Matrix4 } from 'three';
import { useController } from '@/providers/ControllerProvider/useController';
import { SqueezeState } from '@/providers/ControllerProvider/types';
import { Box } from '@react-three/drei';

export type ItemControllerProps = {
  itemRef?: React.RefObject<Group>;
};

function lineToLineTRS(
  A1: Vector3,
  A2: Vector3,
  B1: Vector3,
  B2: Vector3,
  currentMatrix: Matrix4,
) {
  // 1. Decompose Current Matrix
  const P_Old = new Vector3();
  const R_Old = new Quaternion();
  const S_Old = new Vector3();

  currentMatrix.decompose(P_Old, R_Old, S_Old);

  // 2. Directions
  const D_A = A2.clone().sub(A1);
  const D_B = B2.clone().sub(B1);

  // 3. Scale Factor
  const L_A = D_A.length();
  const L_B = D_B.length();
  if (L_A === 0) return currentMatrix.clone();

  const ScaleFactor = L_B / L_A;

  const S_New = new Matrix4().makeScale(
    S_Old.x * ScaleFactor,
    S_Old.y * ScaleFactor,
    S_Old.z * ScaleFactor,
  );

  // 4. Rotation Delta
  const qDeltaWorld = new Quaternion().setFromUnitVectors(
    D_A.clone().normalize(),
    D_B.clone().normalize(),
  );
  const R_Delta_World = new Matrix4().makeRotationFromQuaternion(qDeltaWorld);

  const r_Old = new Matrix4().makeRotationFromQuaternion(R_Old);
  const r_Old_Invert = r_Old.clone().invert();

  const R_delta_local = new Matrix4()
    .multiply(r_Old_Invert)
    .multiply(R_Delta_World)
    .multiply(r_Old);

  const R_New = new Matrix4().multiply(r_Old).multiply(R_delta_local);

  // 8. Translation Delta
  const M_A = A1.clone().add(A2).multiplyScalar(0.5);
  const M_B = B1.clone().add(B2).multiplyScalar(0.5);

  const T_Delta = new Vector3(M_B.x - M_A.x, M_B.y - M_A.y, M_B.z - M_A.z);

  const T_New = new Matrix4().makeTranslation(
    P_Old.x + T_Delta.x,
    P_Old.y + T_Delta.y,
    P_Old.z + T_Delta.z,
  );

  // 10. Final Matrix
  return new Matrix4().multiply(T_New).multiply(R_New).multiply(S_New);
}

export default function ItemController({ itemRef }: ItemControllerProps) {
  const boxRef = useRef<Mesh>(null);
  const boxRef2 = useRef<Mesh>(null);
  const state = useRef<{
    grab: boolean;
    itemMatrix: Matrix4 | null;
    left: {
      position: Vector3 | null;
    };
    right: {
      position: Vector3 | null;
    };
  }>({
    grab: true,
    itemMatrix: null,
    left: {
      position: null,
    },
    right: {
      position: null,
    },
  });

  const { left, right } = useController();

  useFrame(() => {
    if (
      left.squeeze === SqueezeState.PRESSED &&
      right.squeeze === SqueezeState.PRESSED
    ) {
      state.current.grab = true;
      if (
        state.current.left.position == null &&
        state.current.right.position == null &&
        state.current.itemMatrix == null
      ) {
        state.current.left.position = left.position.clone();
        state.current.right.position = right.position.clone();
        if (itemRef?.current) {
          state.current.itemMatrix = itemRef.current.matrix.clone();
          itemRef.current.matrixAutoUpdate = false;
        }
      }
    } else {
      state.current.grab = false;
      state.current.left.position = null;
      state.current.right.position = null;
      state.current.itemMatrix = null;
    }
  });

  useFrame(() => {
    if (!state.current.grab) return;
    boxRef.current?.position.copy(state.current.left.position ?? new Vector3());
    boxRef2.current?.position.copy(
      state.current.right.position ?? new Vector3(),
    );
  });

  useFrame(() => {
    if (
      state.current.left.position == null ||
      state.current.right.position == null
    )
      return;
    const M = lineToLineTRS(
      state.current.left.position.clone(),
      state.current.right.position.clone(),
      left.position.clone(),
      right.position.clone(),
      state.current.itemMatrix ?? new Matrix4(),
    );
    if (itemRef?.current) {
      itemRef.current.matrix.copy(M);
    }
  });
  return (
    <>
      <Box ref={boxRef} args={[0.01, 0.01, 0.01]} />
      <Box ref={boxRef2} args={[0.01, 0.01, 0.01]} />
    </>
  );
}
