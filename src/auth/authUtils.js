const JWT = require("jsonwebtoken");
const { asyncHandler } = require("../helpers/asyncHandler");
const { AuthFailureError } = require("../core/error.response");

const HEADERS = {
  AUTHORIZATION: "authorization",
};

const permissions = {
  admin: {
    courses: ["create", "update", "delete", "view"],
    users: ["create", "update", "delete", "view"],
  },
  instructor: {
    courses: ["create", "update", "view"],
    users: ["view"],
  },
  student: {
    courses: ["view"],
    users: ["view"],
  },
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });
    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    // Optional: Verify access token
    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error(`Error verifying access token:`, err);
      } else {
        console.log(`Decoded access token:`, decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(`Error creating token pair:`, error);
    return {
      code: "xxx5",
      message: error.message,
      status: "error",
    };
  }
};

const permissionAccess = (role, resource, action) => {
  return (
    permissions[role] &&
    permissions[role][resource] &&
    permissions[role][resource].includes(action)
  );
};

const authenticationV2 = asyncHandler(async (req, res, next) => {
  const accessToken = req.headers[HEADERS.AUTHORIZATION];
  if (!accessToken) {
    throw new AuthFailureError("Authorization header not found");
  }

  try {
    const tokenParts = accessToken.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      throw new AuthFailureError("Invalid authorization header format");
    }

    const token = tokenParts[1];
    const decodedToken = JWT.verify(token, process.env.PUBLIC_KEY);

    // Kiểm tra và ghi nhật ký vai trò người dùng
    console.log(`Vai trò người dùng: ${decodedToken.role}`);

    const controller = req._parsedUrl.pathname.split("/")[1];
    const action = req._parsedUrl.pathname.split("/")[2];

    if (!permissionAccess(decodedToken.role, controller, action)) {
      throw new AuthFailureError("Người dùng không có quyền truy cập");
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    // Xử lý các loại lỗi cụ thể ở đây
    if (error instanceof AuthFailureError) {
      res
        .status(401)
        .json({ status: "error", code: 401, message: error.message });
    } else {
      // Xử lý các loại lỗi khác
      next(error);
    }
  }
});

module.exports = {
  authenticationV2,
  createTokenPair,
};
