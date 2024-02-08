import { useEffect } from 'react';
import { Icons } from '../Icons';
import {
  ButtonCloseStyle,
  EditButton,
  InformTitle,
  ModalWindowStyle,
  OverlayStyle,
  RouteList,
  StyledDeleteButton,
} from './ChooseRouteModal.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoutes } from 'redux/form/selectors';
import { Icon } from '../Icon';
import { deleteRoute } from 'redux/form/slice';

export default function ChooseRouteModal({
  showCloseIcon = true,
  onClose,
  openEdit,
}) {
  const dispatch = useDispatch();
  const routes = useSelector(selectRoutes);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const closeClick = e => {
    if (e.target.name === 'cancel' || e.currentTarget.name === 'closeSvg') {
      onClose();
    }
  };

  const onDeleteClick = id => {
    dispatch(deleteRoute(id));
    if (routes.length === 1) {
      onClose();
    }
  };

  return (
    <OverlayStyle onClick={e => handleBackdropClick(e)}>
      <Icons />
      <ModalWindowStyle>
        {showCloseIcon && (
          <ButtonCloseStyle type="button" name="closeSvg" onClick={closeClick}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L17 17" stroke="#FBFBFB" />
              <path d="M1 17L17 0.999999" stroke="#FBFBFB" />
            </svg>
          </ButtonCloseStyle>
        )}
        <InformTitle>Виберіть маршрут</InformTitle>

        <RouteList>
          {routes.map(route => {
            const { id, from, to, arrTime, depTime } = route;

            return (
              <li key={id}>
                <EditButton
                  onClick={() => {
                    openEdit(id)
                  }}
                  title="Редагувати маршрут"
                >
                  {from} - {to}
                  {route.return === 'так' ? null : ` - ${from}`}, {arrTime},
                  {depTime}
                </EditButton>
                <StyledDeleteButton
                  title="Видалити маршрут"
                  onClick={() => {
                    onDeleteClick(id);
                  }}
                >
                  <Icon name="trash" size={16} />
                </StyledDeleteButton>
              </li>
            );
          })}
        </RouteList>
      </ModalWindowStyle>
    </OverlayStyle>
  );
}
