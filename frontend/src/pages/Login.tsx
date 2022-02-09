import React, { useState } from "react";

import BaseAuthentication from "~/layout/BaseAuthentication";

const sendLoginToAPI = async () => {
  // Perform client side data validation
  // Send API request
};

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {};

  return (
    <BaseAuthentication {...{ isSubmitting, onSubmit }} title="Login">
      <p>Test</p>
    </BaseAuthentication>
  );
}
