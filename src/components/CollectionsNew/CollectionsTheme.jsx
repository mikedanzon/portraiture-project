import React from 'react';
import { Button } from 'react-bootstrap';
import { AiFillEye } from 'react-icons/ai';

function CollectionsTheme(props) {
  return (
    <div className="cnew-main">
      <div className="cnew-theme">
        <div className="cnew-theme-1">
          <span className="theme-pointer pb-2" onClick={props.setThemeClassic}>
            <img
              className={props.classicClick}
              src={props.themeClass}
              alt="classTheme"
            />
            <div className="cnew-theme-text">Classic</div>
          </span>
        </div>
        <div className="cnew-theme-2 pb-2">
          <span className="theme-pointer" onClick={props.setThemeMinimalism}>
            <img
              className={props.minimalismClick}
              src={props.themeMin}
              alt="classTheme"
            />
            <div className="cnew-theme-text">Minimalism</div>
          </span>
        </div>
        <div className="cnew-theme-3 pb-2">
          <span className="theme-pointer" onClick={props.setThemeDarkmode}>
            <img
              className={props.darkmodeClick}
              src={props.themeDark}
              alt="classTheme"
            />
            <div className="cnew-theme-text">Dark Mode</div>
          </span>
        </div>
      </div>
      {props.theme ? (
        <div className="cnew-theme-preview">
          <div className="theme-preview">
            <span className="theme-pointer" onClick={props.previewTheme}>
              <div className="theme-preview-wrap">
                <div className="theme-preview-text-1">
                  <AiFillEye />
                </div>
                <div className="theme-preview-text-2">Preview</div>
              </div>
            </span>
          </div>
        </div>
      ) : null}
      <div className="cnew-theme-button">
        <Button
          variant="none"
          onClick={props.onSaveTheme}
          disabled={!props.theme}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default CollectionsTheme;
