import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";
import { useTransition, animated } from "@react-spring/web";
import { Link } from "react-router-dom";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { guid } from "src/utils/helpers";

type ToastKind = "success" | "danger" | "error" | "warning" | "info";

interface Toast {
  kind: ToastKind;
  title: string;
  delay?: number;
  linkTo?: string;
  externalLink?: {
    href: string;
    text: string;
  };
  id?: string;
}

type AddToast = (toast: Toast) => void;

const ToastContext = React.createContext<AddToast | undefined>(undefined);

function ToastProvider({ children }: { children: any }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const [refMap] = React.useState(() => new WeakMap());
  // const [cancelMap] = React.useState(() => new WeakMap());

  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (toasts.length > 0) {
      const currentToast: Toast = toasts[0];
      const timer = setTimeout(
        () => setToasts(toasts => toasts.slice(1)), // creates a copy of the array containing all but the first element
        currentToast.delay || 2000 // uses either the provided delay or default of 2000 in timer
      );
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const addToast: AddToast = React.useCallback(
    function (toast: Toast) {
      // console.log("%c[ToastContect] call fn", "color: #FF7602", {
      //   toast,
      //   toasts,
      // });
      setToasts(toasts => [...toasts, { ...toast, id: guid() }]);
    },
    [setToasts]
  );

  const removeToast = React.useCallback(
    function (toast: Toast) {
      setToasts(toasts.filter(t => t.id !== toast.id));
    },
    [setToasts, toasts]
  );

  const transitions = useTransition<any, any>(toasts, {
    from: {
      opacity: 0,
      height: 0,
    },
    enter:
      (item: Toast) =>
      (async (next: (state: { opacity: number; height: number }) => void) => {
        console.log("%c[ToastContect] enter", "color: #FF7602", {
          item,
          next,
          offsetHeight: refMap.get(item).offsetHeight,
        });
        return await next({
          opacity: 1,
          height: refMap.get(item).offsetHeight,
        });
      }),
    // leave fires when the element is leaving
    leave: {
      opacity: 0,
    },
    config: {
      tension: 320,
      friction: 36,
    },
    //onRest: item => {
    // return item;
    // setToasts((state) => state.filter((i) => i.id !== item.id))
    //},
  });

  const iconNode = (toast: Toast) => {
    let icon;

    switch (toast.kind) {
      case "success":
        icon = <CheckCircleOutlineIcon />;
        break;
      case "danger":
      case "error":
        icon = <WarningAmberOutlinedIcon />;
        break;
      case "warning":
        icon = <ErrorOutlineIcon />;
        break;
      case "info":
        icon = <InfoOutlinedIcon />;
        break;
      default:
        icon = null;
    }

    return icon;
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <Styled.ToastList>
        {transitions((props, item) => {
          return (
            <Styled.Container style={props}>
              <Styled.Message
                onClick={() => removeToast(item)}
                ref={(ref: React.RefObject<HTMLDivElement>) => ref && refMap.set(item, ref)}
                // allows us to get the item to get the ref
              >
                {iconNode(item)}
                <p>{item.title || item || ""}</p>
                {item.linkTo && <Link to={item.linkTo}>View</Link>}
                {item.externalLink && (
                  <a
                    href={item.externalLink.href}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {item.externalLink.text || "View"}
                  </a>
                )}
              </Styled.Message>
            </Styled.Container>
          );
        })}
      </Styled.ToastList>
    </ToastContext.Provider>
  );
}

function useToastContext() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
}

export { useToastContext, ToastProvider };
/* Styled Components
======================================================= */
let Styled: any;
Styled = {};

type Props = {
  theme: Theme;
};

Styled.ToastList = styled.div((props: Props) => {
  const t: any = props.theme;
  return css`
    label: ModalsAndToasts_ToastList;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    /* z-index: 100; */
    z-index: 100000000000;

    ${t.mq["lg"]} {
      width: 30%;
    }
  `;
});

Styled.Container = styled(animated.div)((props: any) => {
  const t: any = props.theme;
  return css`
    label: ToastNotificationContainer;
    &:last-of-type {
      ${t.mb(8)}
    }
  `;
});

Styled.Message = styled.div((props: Props) => {
  const t: Theme = props.theme;

  return css`
    label: ToastNotificationMessage;
    ${[t.p(5), t.mx(8), t.my(2), t.text.normal]}
    color: #020b1c;
    background-color: transparent;
    display: flex;
    align-items: center;
    position: relative;
    svg {
      ${t.mr(2)}
      flex-shrink: 0;
    }
    p {
      flex: 1;
    }
    a {
      ${[t.ml(2), t.text.medium]}
      color: #020b1c;
      flex-shrink: 0;
      &:hover {
        text-decoration: underline;
      }
    }
    &::before {
      ${t.rounded.md}
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: -1;
      background-color: white;
      border: 1px solid #020b1c;
    }
  `;
});
