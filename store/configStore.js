import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { parseAction, platAction, favorieAction, listAction } from './ActivityActions';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    parseAction,
    platAction,
    favorieAction,
    listAction
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { data } = state
  return { data }
};

export default connect(mapStateToProps, mapDispatchToProps)