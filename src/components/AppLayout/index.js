import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  CloseOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Menu, Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;

export const AppLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // React Router navigation hook

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const onClick = (e) => {
    console.log("Click: ", e);
    if (e.key === "1") navigate("/"); // Redirect to "Trang Up File"
    if (e.key === "2") navigate("/luu-y"); // Redirect to "Lưu Ý"
  };

  const items = [
    {
      key: "1",
      label: "Trang up file", // Clicking this should navigate
    },
    {
      key: "2",
      label: "Lưu ý", // Clicking this should navigate
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        style={{
          background: "#fff",
          position: "relative",
        }}
      >
        <div className="d-flex justify-content-center px-2 pt-2">
          {collapsed ? null : <h4>DAHULI TOOL</h4>}
          <Button
            type="text"
            icon={collapsed ? <MenuFoldOutlined /> : <CloseOutlined />}
            onClick={toggleCollapse}
            style={{ fontSize: "16px" }}
          />
        </div>
        <Menu
          onClick={onClick}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content style={{padding: "30px 30px"}}>{props.children}</Content>
      </Layout>
    </Layout>
  );
};
