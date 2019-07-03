import React from 'react'

const PageContent = (props) => {
  const { innerRef } = props
  return (
    <div ref={innerRef}></div>
  )
}

export default React.forwardRef((props, ref) => <PageContent {...props} innerRef={ref} />)
