import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { FeelbackYesNo } from "@feelback/react";
import { useLocation } from '@docusaurus/router';
import Translate from '@docusaurus/Translate';
import styles from './Rating.module.css';
import ThumbsUp from '@site/static/img/misc/button-thumbs-up.svg';
import ThumbsDown from '@site/static/img/misc/button-thumbs-down.svg';

const CUSTOM_LIKE_DISLIKE = [
  {
    value: "+1",
    icon: <ThumbsUp />,
    title: "Like",
  },
  {
    value: "-1",
    icon: <ThumbsDown />,
    title: "Dislike",
  }
];

export default function FeelbackRating() {
  const rootRef = useRef(null);
  const location = useLocation();
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || location.pathname === '/') {
      return;
    }

    if (!containerRef.current) {
      containerRef.current = document.createElement('div');
      containerRef.current.className = styles.feedbackContainer;
    }

    if (!rootRef.current) {
      const footerElement = document.querySelector('footer');
      if (footerElement) {
        footerElement.appendChild(containerRef.current);
        rootRef.current = ReactDOM.createRoot(containerRef.current);
        
        rootRef.current.render(
          <>
            <hr className={styles.feedbackDivider} />
            <div className={styles.feedbackContent}>
              <span className={styles.questionText}>
                <Translate
                  id="theme.feedback.helpful"
                  description="The text asking if the page is helpful"
                >
                  Is this page helpful?
                </Translate>
              </span>
              <FeelbackYesNo
                contentSetId="bff04c29-b7aa-4481-8507-4cce4d3f5de6"
                preset={CUSTOM_LIKE_DISLIKE}
                className={styles.feelbackButtonsCustom}
              />
            </div>
          </>
        );
      }
    }

    return () => {
      if (rootRef.current) {
        rootRef.current.unmount();
        containerRef.current?.remove();
        rootRef.current = null;
        containerRef.current = null;
      }
    };
  }, [location.pathname]);

  return null;
}