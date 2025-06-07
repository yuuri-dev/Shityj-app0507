import styles from "./Loading.module.css"

const Loading = () => {
  return (
    <div className={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="48"
        height="48"
        fill="#2589d0"
      >
        <circle cx="12" cy="2" r="2" opacity=".1">
          <animate
            attributeName="opacity"
            from="1"
            to=".1"
            dur="1s"
            repeatCount="indefinite"
            begin="0"
          />
        </circle>
        <circle transform="rotate(45 12 12)" cx="12" cy="2" r="2" opacity=".1">
          <animate
            attributeName="opacity"
            from="1"
            to=".1"
            dur="1s"
            repeatCount="indefinite"
            begin=".125s"
          />
        </circle>
        <circle transform="rotate(90 12 12)" cx="12" cy="2" r="2" opacity=".1">
          <animate
            attributeName="opacity"
            from="1"
            to=".1"
            dur="1s"
            repeatCount="indefinite"
            begin=".25s"
          />
        </circle>
        <circle transform="rotate(135 12 12)" cx="12" cy="2" r="2" opacity=".1">
          <animate
            attributeName="opacity"
            from="1"
            to=".1"
            dur="1s"
            repeatCount="indefinite"
            begin=".375s"
          />
        </circle>
        <circle transform="rotate(180 12 12)" cx="12" cy="2" r="2" opacity=".1">
          <animate
            attributeName="opacity"
            from="1"
            to=".1"
            dur="1s"
            repeatCount="indefinite"
            begin=".5s"
          />
        </circle>
        <circle transform="rotate(225 12 12)" cx="12" cy="2" r="2" opacity=".1">
          <animate
            attributeName="opacity"
            from="1"
            to=".1"
            dur="1s"
            repeatCount="indefinite"
            begin=".625s"
          />
        </circle>
        <circle transform="rotate(270 12 12)" cx="12" cy="2" r="2" opacity=".1">
          <animate
            attributeName="opacity"
            from="1"
            to=".1"
            dur="1s"
            repeatCount="indefinite"
            begin=".75s"
          />
        </circle>
        <circle transform="rotate(315 12 12)" cx="12" cy="2" r="2" opacity=".1">
          <animate
            attributeName="opacity"
            from="1"
            to=".1"
            dur="1s"
            repeatCount="indefinite"
            begin=".875s"
          />
        </circle>
      </svg>
    </div>
  );
};

export default Loading;