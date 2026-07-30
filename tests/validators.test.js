/**
 * Tests unitarios para los validadores.
 */

import { jest } from "@jest/globals";
import { validateCreateUser, validateUpdateUser } from "../src/validators/userValidator.js";
import { validateCreateProduct, validateUpdateProduct } from "../src/validators/productValidator.js";

// Mock de req, res, next
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("User Validator", () => {
  describe("validateCreateUser", () => {
    test("debe pasar con datos válidos", () => {
      const req = {
        body: { nombre: "Juan", email: "juan@test.com", password: "123456" },
      };
      const res = mockResponse();
      const next = jest.fn();
      validateCreateUser(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test("debe rechazar si falta nombre", () => {
      const req = { body: { email: "juan@test.com", password: "123456" } };
      const res = mockResponse();
      const next = jest.fn();
      validateCreateUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });

    test("debe rechazar email inválido", () => {
      const req = {
        body: { nombre: "Juan", email: "invalido", password: "123456" },
      };
      const res = mockResponse();
      const next = jest.fn();
      validateCreateUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });

    test("debe rechazar password corta", () => {
      const req = {
        body: { nombre: "Juan", email: "juan@test.com", password: "123" },
      };
      const res = mockResponse();
      const next = jest.fn();
      validateCreateUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("validateUpdateUser", () => {
    test("debe pasar sin datos (solo actualización parcial)", () => {
      const req = { body: {} };
      const res = mockResponse();
      const next = jest.fn();
      validateUpdateUser(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    test("debe rechazar rol inválido", () => {
      const req = { body: { rol: "superadmin" } };
      const res = mockResponse();
      const next = jest.fn();
      validateUpdateUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });
  });
});

describe("Product Validator", () => {
  describe("validateCreateProduct", () => {
    test("debe pasar con datos válidos", () => {
      const req = { body: { nombre: "Producto 1", precio: 100 } };
      const res = mockResponse();
      const next = jest.fn();
      validateCreateProduct(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test("debe rechazar si falta nombre", () => {
      const req = { body: { precio: 100 } };
      const res = mockResponse();
      const next = jest.fn();
      validateCreateProduct(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });

    test("debe rechazar precio negativo", () => {
      const req = { body: { nombre: "Producto", precio: -10 } };
      const res = mockResponse();
      const next = jest.fn();
      validateCreateProduct(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("validateUpdateProduct", () => {
    test("debe pasar sin datos (actualización parcial)", () => {
      const req = { body: {} };
      const res = mockResponse();
      const next = jest.fn();
      validateUpdateProduct(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    test("debe rechazar stock negativo", () => {
      const req = { body: { stock: -5 } };
      const res = mockResponse();
      const next = jest.fn();
      validateUpdateProduct(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });
  });
});
