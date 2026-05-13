import { Button } from "@/components/ui/button";
import { DEFAULT_PAGE } from "@/constants";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DataPagination = ({ page, totalPages, onPageChange }: Props) => {
  const safeTotalPages = Math.max(totalPages, DEFAULT_PAGE);
  const safePage = Math.min(Math.max(page, DEFAULT_PAGE), safeTotalPages);

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {safePage} of {safeTotalPages}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={safePage <= 1}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(safePage - 1)}
        >
          Previous
        </Button>
        <Button
          disabled={safePage >= safeTotalPages || totalPages === 0}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(safeTotalPages, safePage + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
