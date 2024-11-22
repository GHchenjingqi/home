## JFrame类

```java
package test.app.jisuanqi;
// 引入基础类
import javax.swing.*;

public class Jisuanqi {
    public static void main(String[] args) {
        // 1.创建窗口
        JFrame frame = new JFrame("我的计算器");
        // 2.创建画布
        JPanel panel = new JPanel();

        // 2.绘制元素
        JTextField one = new JTextField(10);
        JTextField two = new JTextField(10);
        JTextField res = new JTextField(10);
        JButton add = new JButton("+");
        // 4.布局
        panel.setLayout(null);  // 清除默认布局
        one.setBounds(20,20,240,30);
        two.setBounds(20,50,240,30);
        add.setBounds(20,90,100,30);
        res.setBounds(20,130,240,30);

        // 5.将画布填充元素
        panel.add(one);
        panel.add(two);
        panel.add(add);
        panel.add(res);

        // 6.注册事件
        add.addActionListener(e->{
            int n1 = Integer.parseInt(one.getText());
            int n2 = Integer.parseInt(two.getText());
            res.setText(String.valueOf(n1 + n2));
        });


        // 7.画布关联窗口
        frame.add(panel);
        // 8.显示窗口
        frame.setBounds(500,260,300,260);
        frame.setVisible(true);
        // 9.设置左上角默认关闭最小化按钮
        frame.setDefaultCloseOperation(3);
    }
}
```

