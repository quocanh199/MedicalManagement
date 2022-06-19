const express = require("express");
const router = express.Router();

const {
  mint,
  getMedicine,
  getMedicineHistory,
  updateMedicine,
} = require("../controller/medicine");

/**
 * @swagger
 * components:
 *  schemas:
 *      Mint:
 *          type: object
 *          required:
 *              - privateKey
 *              - name
 *              - amount
 *          properties:
 *              privateKey:
 *                  type: string
 *                  description: private key of authorized account
 *              name:
 *                  type: string
 *                  description: Name of medicine
 *              amount:
 *                  type: int
 *                  description: Amount of medicine
 *          example:
 *              privateKey: "e7bcee5b145ce903a8af38a39cf4657bbcbaf022f7856bfdef2644f73ce0e4c8"
 *              name: "berberin"
 *              amount: 3
 *      Update:
 *          type: object
 *          required:
 *              - privateKey
 *              - medicineId
 *              - name
 *              - amount
 *          properties:
 *              privateKey:
 *                  type: string
 *                  description: private key of authorized account
 *              medicineId:
 *                  type: int
 *                  description: ID of old medicine
 *              name:
 *                  type: string
 *                  description: Name of medicine
 *              amount:
 *                  type: int
 *                  description: Amount of medicine
 *          example:
 *              privateKey: "e7bcee5b145ce903a8af38a39cf4657bbcbaf022f7856bfdef2644f73ce0e4c8"
 *              medicineId: 1
 *              name: "berberin"
 *              amount: 3
 *      Get:
 *          type: object
 *          required:
 *              - medicineId
 *          properties:
 *              medicineId:
 *                  type: int
 *                  description: ID of medicine
 *          example:
 *              medicineId: 1
 *
 */

/**
 * @swagger
 * tags:
 *  name: Medicine
 *  description: Action to Medicine Contract
 */

/**
 * @swagger
 * /api/medicine/mint:
 *  post:
 *      summary: Mint Medicine token
 *      tags: [Medicine]
 *      requestBody:
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Mint'
 *            required: true
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Mint'
 */
router.post("/mint", mint);

/**
 * @swagger
 * /api/medicine/update:
 *  post:
 *      summary: Update Medicine token
 *      tags: [Medicine]
 *      requestBody:
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Update'
 *            required: true
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Update'
 */
router.post("/update", updateMedicine);

/**
 * @swagger
 * /api/medicine/getHistory:
 *  get:
 *      summary: History of Medicine's changes
 *      tags: [Medicine]
 *      parameters:
 *            - in: query
 *              name: medicineId
 *              schema:
 *                type: int
 *              required: true
 *              description: Medicine ID to get history
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Get'
 */
router.get("/getHistory", getMedicineHistory);

/**
 * @swagger
 * /api/medicine/get:
 *  get:
 *      summary: Data of Medicine
 *      tags: [Medicine]
 *      parameters:
 *            - in: query
 *              name: medicineId
 *              schema:
 *                type: int
 *              required: true
 *              description: Medicine ID to get data
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Get'
 */
router.get("/get", getMedicine);

module.exports = router;
