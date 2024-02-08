import React from 'react';

const Icons = () => {
  return (
    <div>
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          overflow: 'hidden',
        }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <symbol id="edit" viewBox="0 0 32 32">
            <path
              fill="none"
              stroke="#fbfcfc"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeMiterlimit="4"
              strokeWidth="3"
              d="M3.835 24.154c0.061-0.551 0.092-0.827 0.175-1.085 0.074-0.229 0.179-0.446 0.311-0.647 0.149-0.226 0.345-0.422 0.737-0.814l17.608-17.608c1.473-1.473 3.861-1.473 5.333 0s1.473 3.861 0 5.333l-17.608 17.608c-0.392 0.392-0.588 0.588-0.814 0.737-0.201 0.132-0.418 0.237-0.647 0.311-0.258 0.083-0.533 0.114-1.085 0.175l-4.513 0.501 0.501-4.512z"
            ></path>
          </symbol>
          <symbol id="logo" viewBox="0 0 32 32">
            <path
              fill="#47523f"
              d="M20.061 1.834c-5.802-1.664-11.788 1.394-13.342 6.815-1.496 5.219 4.555 20.149 4.814 20.781l0.241 0.591c0.028 0.069 0.089 0.123 0.164 0.144 0.075 0.022 0.155 0.009 0.216-0.035l0.518-0.374c0.555-0.4 13.598-9.854 15.095-15.073 1.555-5.421-1.902-11.186-7.704-12.85zM18.252 8.144c2.079 0.596 3.317 2.66 2.76 4.603-0.557 1.941-2.701 3.037-4.779 2.441-2.078-0.596-3.316-2.661-2.76-4.603s2.702-3.037 4.779-2.441z"
            ></path>
          </symbol>

          <symbol id="calendar" viewBox="0 0 28 32">
            <path
              fill="none"
              stroke="#fbfcfc"
              // style="stroke: var(--color1, #fbfcfc)"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeMiterlimit="4"
              strokeWidth="2.6667"
              d="M23.556 5.333h-18.667c-1.473 0-2.667 1.194-2.667 2.667v18.667c0 1.473 1.194 2.667 2.667 2.667h18.667c1.473 0 2.667-1.194 2.667-2.667v-18.667c0-1.473-1.194-2.667-2.667-2.667z"
            ></path>
            <path
              fill="none"
              stroke="#fbfcfc"
              // style="stroke: var(--color1, #fbfcfc)"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeMiterlimit="4"
              strokeWidth="2.6667"
              d="M19.556 2.667v5.333"
            ></path>
            <path
              fill="none"
              stroke="#fbfcfc"
              // style="stroke: var(--color1, #fbfcfc)"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeMiterlimit="4"
              strokeWidth="2.6667"
              d="M8.889 2.667v5.333"
            ></path>
            <path
              fill="none"
              stroke="#fbfcfc"
              // style="stroke: var(--color1, #fbfcfc)"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeMiterlimit="4"
              strokeWidth="2.6667"
              d="M2.222 13.333h24"
            ></path>
          </symbol>

          <symbol id="dark-calendar" viewBox="0 0 28 32">
            <path
              fill="none"
              stroke="#47523F"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeMiterlimit="4"
              strokeWidth="2.6667"
              d="M23.556 5.333h-18.667c-1.473 0-2.667 1.194-2.667 2.667v18.667c0 1.473 1.194 2.667 2.667 2.667h18.667c1.473 0 2.667-1.194 2.667-2.667v-18.667c0-1.473-1.194-2.667-2.667-2.667z"
            ></path>
            <path
              fill="none"
              stroke="#47523F"
              // style="stroke: var(--color1, #47523F)"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeMiterlimit="4"
              strokeWidth="2.6667"
              d="M19.556 2.667v5.333"
            ></path>
            <path
              fill="none"
              stroke="#47523F"
              // style="stroke: var(--color1, #47523F)"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeMiterlimit="4"
              strokeWidth="2.6667"
              d="M8.889 2.667v5.333"
            ></path>
            <path
              fill="none"
              stroke="#47523F"
              // style="stroke: var(--color1, #47523F)"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeMiterlimit="4"
              strokeWidth="2.6667"
              d="M2.222 13.333h24"
            ></path>
          </symbol>

          <symbol id="plus" viewBox="0 0 32 32">
            <path
              fill="none"
              stroke="#fbfcfc"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeMiterlimit="4"
              strokeWidth="2.6667"
              d="M16 6.667v18.667"
            ></path>
            <path
              fill="none"
              stroke="#fbfcfc"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeMiterlimit="4"
              strokeWidth="2.6667"
              d="M6.667 16h18.667"
            ></path>
          </symbol>
          <symbol id="trash" viewBox="0 0 32 32">
            <path
              fill="none"
              stroke="#fbfcfc"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeMiterlimit="4"
              strokeWidth="3"
              d="M12 2.222h8"
            ></path>
            <path
              fill="none"
              stroke="#fbfcfc"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeMiterlimit="4"
              strokeWidth="3"
              d="M4 8h24M25.333 8l-0.935 14.026c-0.14 2.104-0.21 3.156-0.665 3.954-0.4 0.702-1.004 1.267-1.731 1.62-0.826 0.4-1.881 0.4-3.99 0.4h-4.025c-2.109 0-3.163 0-3.99-0.4-0.727-0.353-1.331-0.917-1.731-1.62-0.455-0.798-0.525-1.85-0.665-3.954l-0.935-14.026"
            ></path>
          </symbol>
          <symbol id="main_logo" viewBox="0 0 38 45" fill="none">
            <ellipse
              opacity="0.6"
              cx="17"
              cy="39"
              rx="8"
              ry="3"
              fill="#191413"
              fillOpacity="0.3"
            />
            <path
              d="M23.823 3.17776C16.9327 1.202 9.82514 4.83277 7.9791 11.2707C6.20214 17.4677 13.3882 35.1972 13.6952 35.9487L13.9814 36.6507C14.0148 36.7332 14.0874 36.7966 14.1757 36.8219C14.2653 36.8476 14.36 36.8322 14.4325 36.7801L15.0471 36.3363C15.7059 35.8617 31.1949 24.6342 32.9719 18.4372C34.8179 11.9993 30.7135 5.15358 23.823 3.17776ZM21.6742 10.6715C24.143 11.3794 25.6127 13.8308 24.9513 16.1374C24.2903 18.4427 21.7444 19.744 19.2757 19.0361C16.8083 18.3286 15.3376 15.8756 15.9986 13.5702C16.66 11.2636 19.2068 9.96393 21.6742 10.6715Z"
              fill="#47523F"
            />
          </symbol>

          <symbol id="clock" viewBox="0 0 32 32">
            <path
              fill="none"
              stroke="#fbfcfc"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeMiterlimit="4"
              strokeWidth="2.6667"
              d="M16 29.333c7.364 0 13.333-5.97 13.333-13.333s-5.97-13.333-13.333-13.333c-7.364 0-13.333 5.97-13.333 13.333s5.97 13.333 13.333 13.333z"
            ></path>
            <path
              fill="none"
              stroke="#fbfcfc"
              le="stroke: var(--color1, #fbfcfc)"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeMiterlimit="4"
              strokeWidth="2.6667"
              d="M16 8v8l5.333 2.667"
            ></path>
          </symbol>
        </defs>
      </svg>
    </div>
  );
};

export default Icons;
