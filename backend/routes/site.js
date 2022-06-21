const express = require("express");
const router = express.Router();

const { mint, getSite, getAllSite } = require("../controller/site");

/**
 * @swagger
 * components:
 *  schemas:
 *      MintSite:
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
 *      GetSite:
 *          type: object
 *          required:
 *              - siteId
 *          properties:
 *              siteId:
 *                  type: number
 *                  description: ID of Site
 *          example:
 *              siteId: 1
 *      GetAllSite:
 *          type: object
 *          required:
 *          properties:
 *          example:
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
 *                      $ref: '#/components/schemas/MintSite'
 *            required: true
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/MintSite'
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
 *                type: number
 *              required: true
 *              description: Site ID to get data
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/GetSite'
 */
router.get("/get", getSite);

/**
 * @swagger
 * /api/site/getAll:
 *  get:
 *      summary: List all Site
 *      tags: [Site]
 *      parameters:
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/GetAllSite'
 */
router.get("/getAll", getAllSite);

module.exports = router;
