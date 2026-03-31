---
title: "Getting Started with ROS2"
date: 2024-06-20
categories: ["Robotics"]
tags: ["ROS2", "C++"]
content_types: ["Guide"]
authors: ["Your Name"]
summary: "A practical guide to setting up your first ROS2 workspace and creating publisher-subscriber nodes."
thumbnail: ""
thumb_label: "ROS2"
---

Robot Operating System 2 (ROS2) is the next generation of the popular robotics middleware. Unlike its predecessor, ROS2 uses DDS (Data Distribution Service) as its communication layer, providing real-time capabilities and better security out of the box.

![ROS2 Architecture Overview](/images/placeholder.svg)

## Setting Up Your Workspace

Before writing any code, you need a properly configured workspace. ROS2 uses `colcon` as its build tool, replacing the older `catkin` system.

```bash
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws
colcon build
source install/setup.bash
```

## Creating a Publisher Node

The publisher node sends messages at a fixed rate. In ROS2, nodes are typically written as classes that inherit from `rclcpp::Node`.

```cpp
#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"

class MinimalPublisher : public rclcpp::Node {
public:
    MinimalPublisher() : Node("minimal_publisher"), count_(0) {
        publisher_ = this->create_publisher<std_msgs::msg::String>("topic", 10);
        timer_ = this->create_wall_timer(
            std::chrono::milliseconds(500),
            std::bind(&MinimalPublisher::timer_callback, this));
    }

private:
    void timer_callback() {
        auto message = std_msgs::msg::String();
        message.data = "Hello, ROS2! " + std::to_string(count_++);
        publisher_->publish(message);
    }
    rclcpp::Publisher<std_msgs::msg::String>::SharedPtr publisher_;
    rclcpp::TimerBase::SharedPtr timer_;
    size_t count_;
};
```

## Subscriber Node

The subscriber listens on the same topic and processes incoming messages. The callback pattern in ROS2 is straightforward — bind a method to the subscription.

## Launch Files

ROS2 uses Python-based launch files instead of XML. This gives you the full power of Python for conditional logic, parameter loading, and node composition. A typical launch file sets up multiple nodes with their parameters and remappings in a single command.

## Next Steps

Once your publisher and subscriber communicate, explore services, actions, and lifecycle nodes for more complex robotic behaviors.
