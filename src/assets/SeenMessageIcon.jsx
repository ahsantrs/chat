import React from 'react'

const SeenMessageIcon = ({is_seen}) => {
  return (
<svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="9"
      fill="none"
      viewBox="0 0 18 9"
    >
      <path
        fill={is_seen?'#FF6846':"#B4BDC6"}
        d="M12.013 1.894L5.139 8.799a.67.67 0 01-.954 0L.764 5.351a.342.342 0 010-.48l.477-.48a.336.336 0 01.476 0l2.716 2.735a.336.336 0 00.477 0L11.06.933a.336.336 0 01.478 0l.476.48a.341.341 0 010 .48zm5.22-.48l-.47-.48a.327.327 0 00-.469 0l-6.06 6.193a.328.328 0 01-.47 0l-.487-.497a.327.327 0 00-.47 0l-.47.479a.345.345 0 000 .48L9.52 8.8c.26.264.68.265.94 0l6.773-6.905a.344.344 0 000-.48z"
      ></path>
    </svg>
  )
}

export default SeenMessageIcon
