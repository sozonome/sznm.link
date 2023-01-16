import type {
  FormControlProps,
  FormErrorMessageProps,
  FormHelperTextProps,
  FormLabelProps,
  SkeletonProps,
} from "@chakra-ui/react";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Skeleton,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

export type FormControlWrapperProps = {
  label?: FormLabelProps["children"];
  labelAddon?: ReactNode;
  errorText?: FormErrorMessageProps["children"];
  errorTextColor?: FormErrorMessageProps["color"];
  helperText?: FormHelperTextProps["children"];
  helperTextColor?: FormHelperTextProps["color"];
  isLoaded?: SkeletonProps["isLoaded"];
  children?: ReactNode;
} & Pick<FormControlProps, "isInvalid" | "isRequired">;

const FormControlWrapper = ({
  label,
  labelAddon,
  errorText,
  errorTextColor,
  helperText,
  helperTextColor,
  isInvalid,
  isRequired,
  isLoaded = true,
  children,
}: FormControlWrapperProps) => {
  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired}>
      <Flex alignItems="start">
        {label && <FormLabel>{label}</FormLabel>}
        {labelAddon}
      </Flex>

      <Skeleton isLoaded={isLoaded}>
        {children}

        {errorText && (
          <FormErrorMessage color={errorTextColor}>
            {errorText}
          </FormErrorMessage>
        )}
        {helperText && (
          <FormHelperText color={helperTextColor}>{helperText}</FormHelperText>
        )}
      </Skeleton>
    </FormControl>
  );
};

export default FormControlWrapper;
