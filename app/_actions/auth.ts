"use server";

export const login = (
  email: string,
  password: string,
): Promise<ILoginResponse> => {
  // here should be the code to login the user

  return Promise.resolve({
    error: null,
    status: 200,
    user: {
      email,
      password,
    },
  });
};

export const logout = async () => {
  // remove user from local storage to log user out
};
