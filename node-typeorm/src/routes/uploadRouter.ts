import { Request, Response, Router } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
const router = Router();

// for single file upload
// router
//   .route("/api/upload")
//   .post(upload.single("file"), async (req: Request, res: Response) => {
//     res.json({
//       message: "uploaded",
//     });
//   });

/*
    i can use external storage for uploading files like cloudinary or aws s3 or drive using there apis
    recomended reading
    with cloudinary : https://betterprogramming.pub/how-to-integrate-cloud-services-for-image-upload-in-a-node-js-react-web-app-9cc0aea25015
    drive api:https://developers.google.com/drive/api/guides/manage-uploads#node.js
*/

/* for uploading multiple files 
router
.route("/api/upload")
.post(upload.array("file", 2), async (req: Request, res: Response) => {
    res.json({
        message: "uploaded",
    });
});

*/
/* for uploading single/mutiple files with custome name field
const multiupload = upload.fields([
  { name: "avater", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);
router
  .route("/api/upload")
  .post(multiupload, async (req: Request, res: Response) => {
    console.log(req.files);
    res.json({
      message: "uploaded",
    });
  });

  */
/**
  what i get when i do console.log(req.files)
  {
      avater: [
          {
              fieldname: 'avater',
              originalname: 'Screenshot_1628340085.png',
              encoding: '7bit',
              mimetype: 'image/png',
              destination: 'src/uploads/',
              filename: '414c1630410ce3a0eefed8a35b8e46cc',
              path: 'src\\uploads\\414c1630410ce3a0eefed8a35b8e46cc',
              size: 271962
            }
        ],
        resume: [
            {
                fieldname: 'resume',
                originalname: 'mmm.PNG',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: 'src/uploads/',
                filename: '73a4ac882ad36f3c503759603df9ff84',
                path: 'src\\uploads\\73a4ac882ad36f3c503759603df9ff84',
                size: 60112
            }
        ]
    }
    
    */

// customizing  the name of the file

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;

    cb(null, `${uuidv4()}-${originalname}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new Error("some error"));
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fieldSize: 1024 * 1024 * 5, files: 1 },
});

// uuid + original name
router
  .route("/api/upload")
  .post(upload.array("file"), async (req: Request, res: Response) => {
    // console.log(req);

    res.json({
      message: "uploaded",
    });
  });

export { router as uploadRouter };
