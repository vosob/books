import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook } from "../api/api";

export const useCreateBook = ({ onSuccess: customOnSuccess } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBook,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["books"]);
      if (customOnSuccess) {
        customOnSuccess(...args);
      }
    },
  });
};
