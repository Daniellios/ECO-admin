import { Form, FormProps, useForm } from "@pankod/refine-antd";
import { HttpError } from "@pankod/refine-core";

//TODO think through custom FORM
interface ICreateFormProps {
  children: React.ReactNode;
}

const CreateFrom: React.FC<ICreateFormProps> = ({ children, ...props }) => {
  const {
    formProps,
    saveButtonProps,
    queryResult,
    formLoading,
    form,
    onFinish,
  } = useForm<any, HttpError>({
    action: "create",
  });

  const onHandleSubmit = async () => {
    await form
      .validateFields()
      .then(() => {
        const values = form.getFieldsValue();
        onFinish(values);
      })
      .catch((errorfields) => {
        form.getFieldError(errorfields);
      });
  };

  return (
    <Form {...formProps} layout="vertical">
      {children}
    </Form>
  );
};

export default CreateFrom;
