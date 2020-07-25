import { Button, Table, TableColumn, Row, Col } from "element-ui";

const element = {
  install: function(Vue) {
    Vue.use(Button);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(Row);
    Vue.use(Col);
  }
};

export default element;
