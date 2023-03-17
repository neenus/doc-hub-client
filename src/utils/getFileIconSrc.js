export const getFileIconSrc = file => {
  const fileExtension = file.name.split('.').pop();
  switch (fileExtension) {
    case 'pdf':
      return "/icons/pdf.png";
    case 'docx':
      return "/icons/doc.png";
    case "doc":
      return "/icons/doc.png";
    case 'xlsx':
      return "/icons/xls.png";
    case 'xls':
      return "/icons/xls.png";
    case 'gz':
      return "/icons/archive.png";
    case 'zip':
      return "/icons/zip.png";
    case "csv":
      return "/icons/csv.png";
    case 'txt':
      return "/icons/txt.png";
    case "dmg":
      return "/icons/dmg.png";
    case "exe":
      return "/icons/exe.png";
    case "png":
      return "/icons/image.png";
    case "jpg":
      return "/icons/image.png";
    case "jpeg":
      return "/icons/image.png";
    case "gif":
      return "/icons/image.png";
    case "svg":
      return "/icons/image.png";
    default:
      return "/icons/file.png";
  }
}