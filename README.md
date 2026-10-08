# Media Microservice

A production-ready, TypeScript-based Express 5 microservice providing zero-trust, direct-to-cloud image uploads to Cloudinary. Designed to run as an independent microservice alongside an Authentication service using shared JWT signatures.

---

## 🛠️ Tech Stack

- **Runtime & Framework:** Node.js, Express 5, TypeScript
- **Security & Authorization:** `jose` (JWT Verification), `helmet`, `express-rate-limit`
- **Validation:** `zod`
- **Cloud Storage Integration:** `cloudinary` (Direct Signed REST API)

---

## Folder Structure
```
media-service/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    ├── config/
    │   └── env.ts
    ├── controllers/
    │   └── upload.controller.ts
    ├── lib/
    │   └── cloudinary.ts
    ├── middleware/
    │   ├── auth.ts
    │   ├── errorHandler.ts
    │   └── rateLimiter.ts
    ├── routes/
    │   └── upload.route.ts
    └── schemas/
        └── upload.schema.ts
```

---

## ⚙️ Environment Setup

Create a `.env` file in the project root:

```env
PORT=5001
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:3000

# Must match the secret key used by your Auth Microservice
JWT_SECRET=your_super_secret_access_token_key_at_least_32_chars

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

🚀 Running the Microservice
1. Install Dependencies
Bash
pnpm install
2. Start Development Mode
Bash
pnpm dev
3. Build & Run Production
Bash
pnpm build
pnpm start
📖 API Reference
Base URL: http://localhost:5001/api/media
1. Generate Direct Upload Signature
Requests a timestamped cryptographic signature for direct client-side upload to Cloudinary REST API.

Endpoint: POST /api/media/signature

Protection: Authorization: Bearer <accessToken>

Rate Limit: 30 requests / 15 mins

Request Body:

JSON
{
  "category": "avatars"
}
Response (200 OK):

JSON
{
  "signature": "81f211da329e4...",
  "timestamp": 1728392842,
  "folder": "users/1/avatars",
  "allowedFormats": "jpg,jpeg,png,webp",
  "maxFileSize": 5000000,
  "cloudName": "your_cloud_name",
  "apiKey": "123456789012345"
}
2. Persist Media URL
Registers uploaded image details upon direct upload completion.

Endpoint: POST /api/media/save-url

Protection: Authorization: Bearer <accessToken>

Request Body:

JSON
{
  "imageUrl": "[https://res.cloudinary.com/demo/image/upload/v123456/users/1/avatars/sample.jpg](https://res.cloudinary.com/demo/image/upload/v123456/users/1/avatars/sample.jpg)",
  "publicId": "users/1/avatars/sample"
}
Response (200 OK):

JSON
{
  "message": "Media URL registered successfully",
  "media": {
    "userId": 1,
    "imageUrl": "[https://res.cloudinary.com/demo/image/upload/v123456/users/1/avatars/sample.jpg](https://res.cloudinary.com/demo/image/upload/v123456/users/1/avatars/sample.jpg)",
    "publicId": "users/1/avatars/sample",
    "uploadedAt": "2026-10-08T12:00:00.000Z"
  }
}
