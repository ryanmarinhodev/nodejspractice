import jwt from "jsonwebtoken";

const { verify } = jwt;

const middlewareLogin = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token não encontrado, insira o token" });
  }

  try {
    const decoded = verify(token, "segredo");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export { middlewareLogin };
