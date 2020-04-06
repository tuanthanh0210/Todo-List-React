import React, {Component} from 'react';
import './TodoItem.css';
import deleteItem from '../img/delete.svg';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import checkImg from '../img/check.svg';
import checkCompleteImg from '../img/check-done.svg';

class TodoItem extends Component {
  render () {
    const {item, onClick, onDelete} = this.props;
    let url = checkImg;
    if (item.isComplete) {
      url = checkCompleteImg;
    }

    return (
      <div
        className={classNames ('TodoItem', {
          ' TodoItem-complete': item.isComplete,
        })}
      >
        <img onClick={onClick} src={url} width={32} height={32} alt="text" />
        <p>{this.props.item.title}</p>
        <img
          className="button-delete"
          src={deleteItem}
          height={16}
          width={16}
          alt="text"
          onClick={onDelete}
        />
      </div>
    );
  }
}

TodoItem.propTypes = {
  item: PropTypes.shape ({
    isComplete: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func,
};

export default TodoItem;
