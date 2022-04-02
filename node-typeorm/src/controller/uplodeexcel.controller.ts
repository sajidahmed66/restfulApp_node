import { Request, Response } from "express";

const multer = require("multer");
var path = require("path");
var fs = require("fs");

const uploadFile = async (req: Request, res: Response) => {
  var location = path.resolve(
    __dirname.replace("controllers", ""),
    "public/files/Excel/uploads/"
  );
  //var location = 'C:/Users/Fuad/Google Drive/GTD- Clarity/codes/clarity/public/files/Design/'

  var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, location);
    },
    filename: function (req, file, callback) {
      console.log("look", file.originalname);
      callback(null, "_" + Date.now() + "_" + file.originalname);
    },
  });
  //var upload = multer({ storage: Storage }).array("imgUploader", 3);
  var upload = multer({
    storage: Storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "application/pdf" ||
        file.mimetype ==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.mimetype ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.mimetype ==
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ) {
        cb(null, true);
      } else {
        cb("Unsupported File Format", false);

        //return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    },
  }).array("fileUploader", 3); //Field name and max count
  //Field name and max count

  // upload(req, res, function (err) {
  //     //console.log('look',err)
  //     if (err != null) {
  //         console.log('error', err);
  //         res.status(400).send(err);
  //     } else {
  //         console.log('req', req.body.userfilename)
  //         console.log('succecsserr');
  //         var filename = getLatestFile(location);
  //         XlsxPopulate.fromFileAsync(filePath)
  //                     .then(workbook => {
  //                     var item1 = workbook.sheet("Integrated Water Balance").cell("E33").value();
  //                      .sheet("Integrated Water Balance").cell("I34").value();
  //                     workbook.sheet("Integrated Water Balance").cell("J9").value();
  //                     workbook.sheet("Integrated Water Balance").cell("L19").value();
  //                     workbook.sheet("Integrated Water Balance").cell("L22").value();
  //                     workbook.sheet("Integrated Water Balance").cell("L25").value();
  //                     workbook.sheet("Integrated Water Balance").cell("L28").value();
  //                     workbook.sheet("Integrated Water Balance").cell("L35").value();
  //                     workbook.sheet("Integrated Water Balance").cell("L41").value();
  //                     //workbook.sheet("Integrated Water Balance").cell("L45").value(parseFloat(item13) + parseFloat(item14) + parseFloat(item15) + parseFloat(item16));
  //                     workbook.sheet("Integrated Water Balance").cell("L56").value();
  //                     workbook.sheet("Integrated Water Balance").cell("L59").value();
  //                     workbook.sheet("Integrated Water Balance").cell("O33").value();
  //                     workbook.sheet("Integrated Water Balance").cell("P29").value();
  //                     workbook.sheet("Integrated Water Balance").cell("P39").value();
  //                     workbook.sheet("Integrated Water Balance").cell("Q2").value();
  //                     workbook.sheet("Integrated Water Balance").cell("Q9").value();
  //                     workbook.sheet("Integrated Water Balance").cell("Q35").value();
  //                     workbook.sheet("Integrated Water Balance").cell("R2").value();
  //                     workbook.sheet("Integrated Water Balance").cell("R41").value();
  //                     //workbook.sheet("Integrated Water Balance").cell("R46").value(parseFloat(r46).toFixed(2));
  //                     workbook.sheet("Integrated Water Balance").cell("R55").value();
  //                     workbook.sheet("Integrated Water Balance").cell("S3").value();
  //                     workbook.sheet("Integrated Water Balance").cell("S16").value();
  //                     workbook.sheet("Integrated Water Balance").cell("S19").value();
  //                     workbook.sheet("Integrated Water Balance").cell("S27").value();
  //                     workbook.sheet("Integrated Water Balance").cell("T2").value();
  //                     workbook.sheet("Integrated Water Balance").cell("U5").value();
  //                     workbook.sheet("Integrated Water Balance").cell("U9").value();
  //                     workbook.sheet("Integrated Water Balance").cell("U30").value();
  //                     workbook.sheet("Integrated Water Balance").cell("Z35").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AB35").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AG3").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AG49").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AG64").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AG69").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AH3").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AI3").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AI9").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AI20").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AI39").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AI48").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AI63").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AK20").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AM45").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AN3").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AN49").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AN61").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AN66").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AO16").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AO27").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AO46").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AO53").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AO54").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AO72").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AO73").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AQ11").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AQ22").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AQ40").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AQ45").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AQ51").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AQ55").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AQ66").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AQ72").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AQ85").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AQ97").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AR16").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AR28").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AU51").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AU62").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AU66").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AU69").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AU72").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AU77").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AU85").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AU89").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AV54").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AV93").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AX75").value();
  //                     workbook.sheet("Integrated Water Balance").cell("AY90").value();
  //                     workbook.sheet("Integrated Water Balance").cell("BA49").value();
  //                     workbook.sheet("Integrated Water Balance").cell("BA55").value();
  //                     workbook.sheet("Integrated Water Balance").cell("BA67").value();
  //                     workbook.sheet("Integrated Water Balance").cell("BA72").value();
  //                     workbook.sheet("Integrated Water Balance").cell("BA99").value();
  //                     workbook.sheet("Integrated Water Balance").cell("BC65").value();
  //                     workbook.sheet("Integrated Water Balance").cell("BD3").value();
  //                     workbook.sheet("Integrated Water Balance").cell("BE47").value();
  //                     workbook.sheet("Integrated Water Balance").cell("BE55").value();
  //                     workbook.sheet("Integrated Water Balance").cell("BE67").value();
  //                     workbook.sheet("Integrated Water Balance").cell("BG6").value();
  //                     workbook.sheet("Integrated Water Balance").cell("BG9").value();
  //                     workbook.toFileAsync(outputfilePath).then(function(){
  //                         res.end();
  //                     });
  //                 });
  //         res.send("File upload sucessfully." + filename);
  //         /** end insert */
  //     }

  // });
};

function getLatestFile(dirpath) {
  // Check if dirpath exist or not right here

  let latest;

  const files = fs.readdirSync(dirpath);
  files.forEach((filename) => {
    // Get the stat
    const stat = fs.lstatSync(path.join(dirpath, filename));
    // Pass if it is a directory
    if (stat.isDirectory()) return;

    // latest default to first file
    if (!latest) {
      latest = { filename, mtime: stat.mtime };
      return;
    }
    // update latest if mtime is greater than the current latest
    if (stat.mtime > latest.mtime) {
      latest.filename = filename;
      latest.mtime = stat.mtime;
    }
  });

  return latest.filename;
}

module.exports = {
  uploadFile,
};
