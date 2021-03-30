import React, { useState } from 'react'

import './style.css'

export type AccordeonItemProps = {
  children: React.ReactElement|React.ReactElement[],
  activeIndex?: number,
  indexAccordeonItem?: number,
  onActiveLabel?: (_: number) => void,
}

export const AccordeonItem = ({
  children, activeIndex, indexAccordeonItem, onActiveLabel,
}: AccordeonItemProps): React.ReactElement => {
  const AccordeonItemChildren = React.Children.map(children, (child) => React.cloneElement(child, {
    isActive: activeIndex === indexAccordeonItem,
    onActivate: () => onActiveLabel(indexAccordeonItem),
  }))
  return <div className="accordeon__item">{AccordeonItemChildren}</div>
}

export type AccordeonProps = {
  children: React.ReactElement|React.ReactElement[],
  isOpen: number,
}

export const Accordeon = ({ children, isOpen = 0 }: AccordeonProps): React.ReactElement => {
  const [activeIndex, setActiveIndex] = useState(isOpen)

  const AccordeonChildren = React.Children.map(children, (child, index) => {
    if (child.type === AccordeonItem) {
      return React.cloneElement(child, {
        activeIndex,
        indexAccordeonItem: index,
        onActiveLabel: (newActiveIndex: number) => { setActiveIndex(newActiveIndex) },
      })
    }
    return child
  })
  return <div className="accordeon">{AccordeonChildren}</div>
}

export type AccordeonLabelProps = {
  children: React.ReactNode,
  isActive?: boolean,
  onActivate?: () => void,
}

export const AccordeonLabel = ({
  children,
  isActive,
  onActivate,
}: AccordeonLabelProps): React.ReactElement => (
  <button
    type="button"
    onClick={() => onActivate()}
    className={isActive ? 'accordeon__label isButtonActive' : 'accordeon__label isButtonInactive'}>
    {children}
  </button>
)

export type AccordeonPanelProps = {
  children: React.ReactNode,
  isActive?: boolean,
}

export const AccordeonPanel = ({ children, isActive }: AccordeonPanelProps): React.ReactElement => (
  isActive && <div className="accordeon__panel">{children}</div>
)

export default Accordeon
