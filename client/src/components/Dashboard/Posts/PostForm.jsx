import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import FileBase from "react-file-base64";
import { Input, MultiLineInput, MultipleInput } from "../../Utils/Input";

const PostForm = ({
  handleChange,
  handleTagChange,
  handleSubmit,
  setContent,
  data,
  setData,
  errors,
  content,
}) => {
  const config = {
    buttons: ["bold", "italic"],
  };
  var tag = null;
  useEffect(() => {
    tag = data?.tags?.join(", ");
  }, [data]);

  const formData = data || { title: "", content: "", tag: "" };
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className="p-4 grid grid-cols-2 gap-4 w-[500px]"
        >
          <Input
            label="Title"
            name="title"
            type="text"
            handleChange={handleChange}
            errorMsg={errors?.title}
            value={formData?.title}
          />
          <MultiLineInput
            label="Content"
            name="content"
            type="text"
            handleChange={handleChange}
            errorMsg={errors?.content}
            value={formData?.content}
          />

          <MultipleInput
            name="tags"
            label="Tags"
            handleChange={handleTagChange}
            type="text"
            errorMsg={errors?.tags}
            value={formData?.content}
          />
          <div className={"col-span-2"}>
            <FileBase
              type={"file"}
              multiple={false}
              onDone={({ base64 }) =>
                setData({ ...data, selectedFile: base64 })
              }
            />
          </div>
          <div className="col-span-2">
            <Button
              variant={"contained"}
              type={"submit"}
              color={"primary"}
              fullWidth
              size={"large"}
            >
              Submit
            </Button>
          </div>
          {/* <div className="col-span-2">
                        <TextEditor setContent={setContent} config={config}/>
                    </div> */}
        </form>
      </div>
    </>
  );
};

export default PostForm;
