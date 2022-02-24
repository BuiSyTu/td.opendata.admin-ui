import {PageTitle} from '../../../../_metronic/layout/core';
import {
  Typography,
  Input,
  Tabs,
  Tree,
} from 'antd';
import ListUser from './components/ListUser';
import DATA_DEMO from './data';
const {Text} = Typography;
const {TabPane} = Tabs;
const MainPage = () => {
  const onSelect = (selectedKeys) => {
    console.log('selected', selectedKeys);
  };

  return (
    <div>
      <PageTitle breadcrumbs={[]}>Cơ cấu tổ chức</PageTitle>
      <div className='row gy-5 g-xl-12'>
        <div className='col-xl-4'>
          <div className='card card-xl-stretch mb-xl-8'>
            <div className='card-header' style={{minHeight: 55}}>
              <Text className='card-title fw-bolder'>Nhóm người dùng</Text>
            </div>
            <div className='d-flex flex-column p-5'>
              <Input size='large' placeholder='Tìm kiếm' prefix={<i class='fas fa-search'></i>} />
              <div className='d-flex flex-column pt-5'>
                <Tree
                  showLine={{showLeafIcon: false}}
                  defaultExpandedKeys={['']}
                  onSelect={onSelect}
                  treeData={DATA_DEMO} 
                />
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-8'>
          <div className='card card-xl-stretch mb-xl-8'>
            <Tabs
              defaultActiveKey='1'
              className='card-title'
              size='large'
              style={{}}
              tabBarStyle={{minHeight: 55, paddingLeft: 10, fontWeight: '600', color: '#181c32'}}
            >
              <TabPane
                tab={
                  <span>
                    <i className='fas fa-users ant-tabs-tab-btn pe-5'></i>
                    Danh sách người dùng
                  </span>
                }
                key='1'
              >
                <div>
                  <ListUser />
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <i className='fas fa-info-circle ant-tabs-tab-btn pe-5'></i>
                    Thông tin
                  </span>
                }
                key='2'
              ></TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
