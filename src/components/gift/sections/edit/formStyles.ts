export const formStyles = {
  wrapperBox: {
    width: '100%',
    height: 'calc(100vh - 48px)',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
  },
  headerBox: {
    backgroundColor: 'background.paper',
    zIndex: 1,
    borderBottom: '1px solid #e0e0e0',
    padding: '24px 24px 16px',
    flexShrink: 0,
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollableWrapper: {
    padding: '24px',
    flexGrow: 1,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#e0e0e0',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#bdbdbd',
    },
  },
};
