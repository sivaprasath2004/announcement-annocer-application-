import axios from "axios";
const mail = async (props) => {
 await axios.post("YOUR BACK-END", {
    email: props,
  });
 await axios.post("YOUR BACK-END", {
    email: {
      Image: props.Image,
      ImageHeight: props.ImageHeight,
      ImageWidth: props.ImageWidth,
      Link: props.Link, 
      Subject: props.Subject,
      Time: props.Time,
      Title: props.Title,
      TitleColor: props.TitleColor,
      Email: props.Email,
      Content: props.Conetent,
      ContentColor: props.ContentColor,
      Attachment: props.Attachment,
    },
  });
};

export default mail;
