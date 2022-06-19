const express = require("express");
const router = express.Router();

const { mint, getSite } = require("../controller/site");

/**
 * @swagger
 * components:
 *  schemas:
 *      Mint:
 *          type: object
 *          required:
 *              - privateKey
 *              - name
 *              - siteAddress
 *          properties:
 *              privateKey:
 *                  type: string
 *                  description: private key of authorized account
 *              name:
 *                  type: string
 *                  description: name of Site
 *              siteAddress:
 *                  type: string
 *                  description: address of Site
 *          example:
 *              privateKey: ""
 *              name: ""
 *              siteAddress: ""
 *      Get:
 *          type: object
 *          required:
 *              - siteId
 *          properties:
 *              siteId:
 *                  type: int
 *                  description: ID of Site
 *          example:
 *              siteId: 1
 *
 */

/**
 * @swagger
 * tags:
 *  name: Site
 *  description: Action to Site Contract
 */

/**
 * @swagger
 * /api/site/mint:
 *  post:
 *      summary: Mint Site token
 *      tags: [Site]
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
 * /api/site/get:
 *  get:
 *      summary: Data of Site
 *      tags: [Site]
 *      parameters:
 *            - in: query
 *              name: siteId
 *              schema:
 *                type: int
 *              required: true
 *              description: Site ID to get data
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Get'
 */
router.get("/get", getSite);

module.exports = router;
