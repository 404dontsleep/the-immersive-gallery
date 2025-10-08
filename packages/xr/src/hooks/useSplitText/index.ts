import { useEffect, useState } from "react";

// Hàm hook này sẽ chia đoạn text dài thành nhiều trang, mỗi trang có tối đa maxLength ký tự
export default function useSplitText(text: string, maxLength: number) {
  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);

  const next = () => {
    if (currentPage < pages.length - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setCurrentText(pages[newPage]);
      setCanNext(newPage < pages.length - 1);
      setCanPrev(newPage > 0);
    }
  };

  const prev = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setCurrentText(pages[newPage]);
      setCanNext(newPage < pages.length - 1);
      setCanPrev(newPage > 0);
    }
  };

  useEffect(() => {
    if (!text || maxLength <= 0) {
      setPages([]);
      setCurrentText("");
      setCanNext(false);
      setCanPrev(false);
      return;
    }

    const result: string[] = [];
    let start = 0;

    while (start < text.length) {
      // Cắt ra một đoạn có độ dài tối đa maxLength
      const end = start + maxLength;

      // Nếu end vượt quá độ dài text thì lấy đến hết
      if (end >= text.length) {
        result.push(text.slice(start));
        break;
      }

      // Tìm vị trí dấu cách gần nhất trước end để không cắt giữa từ
      let lastSpace = text.lastIndexOf(" ", end);
      if (lastSpace <= start) {
        // Nếu không tìm thấy dấu cách, buộc phải cắt tại end
        lastSpace = end;
      }

      result.push(text.slice(start, lastSpace));
      start = lastSpace;
      // Bỏ qua dấu cách ở đầu trang tiếp theo nếu có
      while (text[start] === " ") start++;
    }

    setPages(result);
    setCurrentText(result[0] || "");
    setCanNext(result.length > 1);
    setCanPrev(false);
    setCurrentPage(0);
  }, [text, maxLength]);

  return {
    pages,
    currentPage,
    next,
    prev,
    currentText,
    canNext,
    canPrev,
  };
}
