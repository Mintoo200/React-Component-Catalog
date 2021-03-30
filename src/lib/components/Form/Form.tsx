import React, { useEffect, useState } from 'react'

export type FieldValue<T> = {
  validity: ValidityState,
  pristine: boolean,
  value: T,
}

export type FormState = {
  valid: boolean,
  content: Record<string, FieldValue<unknown>>,
}

export type Props = {
  children: React.ReactNode,
  onChange?: (state: FormState) => void,
  onSubmit?: (state: FormState) => void,
}

// FIXME: ?
const defaultValidityState: ValidityState = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: true,
  valueMissing: false,
}

const isInputField = (node: React.ReactElement): node is React.ReactElement => (
  node.type === 'input'
  || node.type === 'textarea'
  || node.type === 'select'
)

const Form: React.FC<Props> = ({ children, onChange, onSubmit }) => {
  const defaultState = {} as Record<string, FieldValue<unknown>>
  const setDefault = (node: React.ReactNode) => {
    React.Children.forEach(node, (child) => {
      if (React.isValidElement(child)) {
        if (isInputField(child)) {
          const valid = (child.props.required == null) ? true : !child.props.required
          defaultState[child.props.id] = {
            validity: {
              ...defaultValidityState,
              valid,
              valueMissing: !valid,
            },
            pristine: true,
            value: child.props.defaultValue,
          }
        }
        if (child.props.children) {
          setDefault(child.props.children)
        }
      }
    })
  }
  useEffect(() => {
    setDefault(children)
  }, [])
  const [formContent, setFormContent] = useState(defaultState)
  useEffect(() => {
    if (onChange != null) {
      onChange({
        valid: Object.values(formContent).every((input) => input.validity.valid),
        content: formContent,
      })
    }
  }, [formContent])
  const onFieldChange = (id: string, newValue: FieldValue<unknown>) => {
    setFormContent((previousState) => ({
      ...previousState,
      [id]: newValue,
    }))
  }
  const addProps = (currentChildren: React.ReactNode): React.ReactNode => (
    React.Children.map(currentChildren, (child) => {
      if (React.isValidElement(child)) {
        const props = {} as React.HTMLAttributes<HTMLElement>
        let processedChildren = null as React.ReactNode
        if (isInputField(child)) {
          props.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            onFieldChange(child.props.id, {
              validity: event.currentTarget.validity,
              pristine: formContent[child.props.id].pristine,
              value: event.currentTarget.value,
            })
            return child.props.onChange && child.props.onChange(event)
          }
          props.onBlur = (event: React.FocusEvent) => {
            onFieldChange(child.props.id, {
              validity: formContent[child.props.id].validity,
              pristine: false,
              value: formContent[child.props.id].value,
            })
            return child.props.onBlur && child.props.onBlur(event)
          }
        }
        if (child.props.type === 'submit') {
          props.onClick = (event: React.MouseEvent) => {
            const result = child.props.onClick && child.props.onClick(event)
            if (onSubmit != null) {
              event.preventDefault()
              onSubmit({
                valid: Object.values(formContent).every((input) => input.validity.valid),
                content: formContent,
              })
            }
            return result
          }
        }
        if (child.props.children) {
          processedChildren = addProps(child.props.children)
        }
        return React.cloneElement(child, {
          ...props,
          children: processedChildren,
        })
      }
      return child
    })
  )
  return (
    <form>
      {addProps(children)}
    </form>
  )
}

export default Form
