import { useEffect, useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  addCategories,
  resetStatus,
} from "../../../../store/adminCategorySlice";
import { Status } from "../../../../globals/types/type";

interface ModalProps {
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ closeModal }: ModalProps) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((store) => store.categories);
  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      dispatch(addCategories(categoryName));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === Status.SUCCESS) {
      setLoading(false);
      closeModal();
      dispatch(resetStatus());
    }
  }, [status]);

  return (
    <div
      id="modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Add New Category
          </h3>
          <button
            id="closeModalButton"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={closeModal}
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Category Name
            </label>
            <input
              onChange={(e) => setCategoryName(e.target.value)}
              type="text"
              id="categoryName"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-indigo-400"
              placeholder="Enter category name (e.g., Electronics, Food)"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={closeModal}
              id="cancelButton"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submitUrlButton"
              className="flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-md shadow-md hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600"
              disabled={loading}
            >
              {loading ? (
                <>
                  Adding...{" "}
                  <svg
                    className="w-4 h-4 ml-2 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6V2a1 1 0 112 0v4a1 1 0 01-1 1H4a1 1 0 110-2h1zM6 18v4a1 1 0 11-2 0v-4a1 1 0 012 0zM18 6v4a1 1 0 11-2 0V6a1 1 0 012 0zM18 18v4a1 1 0 11-2 0v-4a1 1 0 012 0z"
                    />
                  </svg>
                </>
              ) : (
                "Add Category"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
