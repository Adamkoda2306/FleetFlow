import jwt from "jsonwebtoken";

// ------------ Generate Token for User ------------
const generateToken = async (id: string): Promise<
  | { success: true; token: string }
  | { success: false; message: string }
> => {
  const user = id;

  if (!process.env.SECRET_KEY) {
    return {
      success: false,
      message: "Error in generating JWT token!"
    };
  }

  const token = jwt.sign(
    { id: user },
    process.env.SECRET_KEY,
  );

  return {
    success: true,
    token: token
  };
};

// Added Role in this JWT token
export const generateTokenUser = async (id: string, role: string, isRefresh: boolean, isMobile: boolean): Promise<
  | { success: true; token: string }
  | { success: false; message: string }
> => {
  const user = id;
  const user_role = role;

  if (!process.env.SECRET_KEY) {
    return {
      success: false,
      message: "Error in generating JWT token!"
    };
  }

  const token = jwt.sign(
    { id: user, role: user_role },
    process.env.SECRET_KEY,
    {
      expiresIn: isRefresh ? (isMobile ? undefined : "15d") : "15m",
    }
  );

  return {
    success: true,
    token: token
  };
};

export default generateToken;