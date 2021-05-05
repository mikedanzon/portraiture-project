import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function HeaderProps(props) {
  return (
    <div className="hprops-background">
      <div className="hprops-text">
        <div className="hprops-text-mid">{props.title}</div>
        <div className="hprops-text-close">
          <Link to={props.link}>
            <AiOutlineClose />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderProps;
