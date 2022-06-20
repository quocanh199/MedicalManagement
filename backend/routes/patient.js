const express = require("express");
const router = express.Router();

const {
  mint,
  getPatientFromPhone,
  getPatient,
} = require("../controller/patient");

/**
 * @swagger
 * components:
 *  schemas:
 *      MintPatient:
 *          type: object
 *          required:
 *              - privateKey
 *              - name
 *              - gender
 *              - dateOfBirth
 *              - patientAddress
 *              - phoneNumber
 *          properties:
 *              privateKey:
 *                  type: string
 *                  description: private key of authorized account
 *              name:
 *                  type: string
 *                  description: name of Patient
 *              gender:
 *                  type: string
 *                  description: gender of Patient
 *              dateOfBirth:
 *                  type: string
 *                  description: DOB of Patient
 *              patientAddress:
 *                  type: string
 *                  description: address of Patient
 *              phoneNumber:
 *                  type: string
 *                  description: phone number of Patient
 *              siteId:
 *                  type: number
 *                  description: ID of Site Token
 *
 *          example:
 *              privateKey: ""
 *              name: ""
 *              gender: ""
 *              dateOfBirth: ""
 *              patientAddress: ""
 *              phoneNumber: ""
 *              siteId: 1
 *      GetPatientID:
 *          type: object
 *          required:
 *              - phoneNumber
 *          properties:
 *              phoneNumber:
 *                  type: string
 *                  description: phone of Patient
 *          example:
 *              phoneNumber: ""
 *      GetPatient:
 *          type: object
 *          required:
 *              - patientId
 *          properties:
 *              patientId:
 *                  type: number
 *                  description: ID of Patient
 *          example:
 *              patientId: 1
 *
 */

/**
 * @swagger
 * tags:
 *  name: Patient
 *  description: Action to Patient Contract
 */

/**
 * @swagger
 * /api/patient/mint:
 *  post:
 *      summary: Mint Patient token
 *      tags: [Patient]
 *      requestBody:
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/MintPatient'
 *            required: true
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/MintPatient'
 */
router.post("/mint", mint);

/**
 * @swagger
 * /api/patient/getID:
 *  get:
 *      summary: Data of Patient
 *      tags: [Patient]
 *      parameters:
 *            - in: query
 *              name: phoneNumber
 *              schema:
 *                type: string
 *              required: true
 *              description: phone number to get Patient ID
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/GetPatientID'
 */
router.get("/getID", getPatientFromPhone);
/**
 * @swagger
 * /api/patient/get:
 *  get:
 *      summary: Data of Patient
 *      tags: [Patient]
 *      parameters:
 *            - in: query
 *              name: patientId
 *              schema:
 *                type: number
 *              required: true
 *              description: Patient ID to get data
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/GetPatient'
 */
router.get("/get", getPatient);

module.exports = router;
