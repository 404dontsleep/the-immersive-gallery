import { useBankResultControllerCount } from '@api';

export default function useBankResultBadge() {
  const { data: count, mutate: mutateCount } = useBankResultControllerCount({
    where: { isProcessed: { in: [false] } },
  });
  return { count, mutateCount };
}
