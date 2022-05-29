// Global helper functions

// checking if a response is an error
export const validateError = (response) => {
    if (response.response && response.response.status === "error") {
        return true;
    }
    return false;
}