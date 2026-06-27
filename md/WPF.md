## XAML 基础

XAML即可扩展应用程序标记语言，是一种由微软开发的基于 XML 的声明式标记语言，用于描述用户界面的结构和外观。

XAML 文件是通常具有 `.xaml` 扩展名的 XML 文件。 可通过任何 XML 编码对文件进行编码，但通常以 UTF-8 编码。

是wpf中专门用于设计UI的语言。

### 相关概念

~~~xaml
<Window	x:Class="WpfApp2.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:WpfApp2" 
        xmlns:userControl="clr-namespace:WpfApp2.view.UserControl"
        mc:Ignorable="d"
        Title="MainWindow" Height="450" Width="800">
    <Grid>
    </Grid>
</Window>
~~~

XAML是通过标签来声明元素的，每一个元素对应着内存中一个对象。

标签有两种类型，空标签和非空标签

~~~xaml
<Tag></Tag> // 非空标签结构
<Tag/>	    // 空标签结构
~~~

#### 属性

属性用于设置元素的各种特性，如大小、颜色、文本内容等。属性可以直接在元素标签中以键值对的形式指定。

**示例**：

```xml
<TextBlock Text="Hello, XAML!" FontSize="20" Foreground="Blue"/>
```

在这个 `<TextBlock>` 元素中，`Text` 属性设置了显示的文本内容，`FontSize` 属性设置了字体大小，`Foreground` 属性设置了文本颜色。

####  元素

元素是 XAML 中构建用户界面的基本组成部分，它们对应着不同的 UI 控件或容器。常见的元素包括 `<Button>`、`<TextBox>`、`<Grid>` 等。每个元素都可以有自己的属性和子元素。

**示例**：

```xml
<Button Content="Click Me" HorizontalAlignment="Left" Margin="212,135,0,0" VerticalAlignment="Top" Width="75"/>
```

这个 `<Button>` 元素定义了一个按钮，通过 `Content` 属性设置按钮上显示的文本，还设置了按钮的对齐方式、边距和宽度等属性。

#### 根元素

每个 XAML 文件都有一个根元素，它是整个 XAML 文档结构的起点。根元素通常定义了应用程序的主要容器，如在 WPF 中是 `<Window>` 元素，在 UWP 中可能是 `<Page>` 元素。根元素包含了整个用户界面的结构和布局信息。

**示例（WPF 窗口）**：

```xml
<Window x:Class="WpfApp1.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="MainWindow" Height="350" Width="525">
    <!-- 窗口内容 -->
</Window>
```

在这个例子中，`<Window>` 就是根元素，它定义了一个窗口的基本属性，如标题、高度和宽度。

#### 子元素

素可以包含其他元素作为其子元素，通过这种方式可以构建复杂的用户界面布局。常见的容器元素（如 `<Grid>`、`<StackPanel>` 等）用于组织和排列子元素。

**示例**：

```xml
<Grid>
    <Button Content="Button 1" HorizontalAlignment="Left" Margin="10,10,0,0" VerticalAlignment="Top"/>
    <Button Content="Button 2" HorizontalAlignment="Left" Margin="10,50,0,0" VerticalAlignment="Top"/>
</Grid>
```

在这个 `<Grid>` 容器中，包含了两个 `<Button>` 子元素，它们在网格中按照指定的边距进行排列。

#### 注释

与 XML 类似，XAML 也支持注释，用于在代码中添加说明和解释。注释不会被解析器处理，仅用于开发者阅读和理解代码。

**示例**：

```xml
<!-- 这是一个注释，用于说明下面的按钮功能 -->
<Button Content="Submit" HorizontalAlignment="Left" Margin="212,135,0,0" VerticalAlignment="Top" Width="75"/>
```

#### 资源

资源是可以在 XAML 中定义并共享的对象，如样式、画笔、模板等。资源通常定义在 `<ResourceDictionary>` 中，可以通过键来引用。

**示例**：

```xml
<Window.Resources>
    <Style x:Key="MyButtonStyle" TargetType="Button">
        <Setter Property="Foreground" Value="Red"/>
        <Setter Property="FontSize" Value="16"/>
    </Style>
</Window.Resources>
<Grid>
    <Button Content="Styled Button" Style="{StaticResource MyButtonStyle}" HorizontalAlignment="Left" Margin="212,135,0,0" VerticalAlignment="Top" Width="75"/>
</Grid>
```

#### 命名空间

XML语言有一个功能就是可以在XML文档的标签上使用 xmIns 特征来定义名称空间(Namespace)，xmIns也就是XML-Namespace 的缩写。

定义名称空间可以当来源不同的类重名时，可以使用名称空间加以区分。

xmns特征的语法格式如下:

~~~xaml
xmlns[:可选的映射前缀]="名称空间"
~~~

xmlns后可以跟一个可选的映射前缀，之间用冒号分隔。如果没有写可选映射前缀，那就意味着所有来自于这个名称空间的标签前都不用加前缀，这个没有映射前缀的名称空间称为“**默认名称空间**”

**默认名称空间只能有一个**，而且应该选择其中元素被最频繁使用的名称空间来充当默认名称空间。

~~~xaml
<Window x:Class="WpfApp2.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:WpfApp2" 
        xmlns:userControl="clr-namespace:WpfApp2.view.UserControl"
        mc:Ignorable="d"
        Title="MainWindow" Height="450" Width="800">
    <Grid>
    </Grid>
</Window>
~~~

**< Window >**和**< Grid >**都来自由第二行声明的默认名称空间。而第一行中的 Class 特征则来自于第三行中x:前缀对应的名称空间。

如果给第二行声明的名称空间加上一个前缀 **n**，则对应的元素的命名空间前面也要加上 **n**

~~~xaml
<n:Window x:Class="WpfApp2.MainWindow"
        xmlns:n="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:WpfApp2" 
        xmlns:userControl="clr-namespace:WpfApp2.view.UserControl"
        mc:Ignorable="d"
        Title="MainWindow" Height="450" Width="800">
    <n:Grid>
    </n:Grid>
</n:Window>
~~~

### 基础结构

与传统设计思维不同，XAML使用树形逻辑结构来描述。

~~~xaml
<Window x:Class="WpfApp2.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:WpfApp2" 
        xmlns:userControl="clr-namespace:WpfApp2.view.UserControl"
        mc:Ignorable="d"
        Title="MainWindow" Height="450" Width="800">
    <Grid>
        <Button>
            <StackPanel>
                <TextBlock Text="1" />
                <Label Content="2" />
            </StackPanel>
        </Button>
        <Button>
            <StackPanel>
                <TextBlock Text="1" />
                <Label Content="2" />
            </StackPanel>
        </Button>
        <Button>
            <StackPanel>
                <TextBlock Text="1" />
                <Label Content="2" />
            </StackPanel>
        </Button>
    </Grid>
</Window>
~~~

通过树形结构描述的关系

~~~mermaid
%%{init: {'theme':'dark'}}%%
graph TD
    A([Window]):::startend --> B(Grid):::process
    B --> C1(Button):::process
    B --> C2(Button):::process
    B --> C3(Button):::process
    C1 --> D1(StackPanel):::process
    C2 --> D2(StackPanel):::process
    C3 --> D3(StackPanel):::process
    D1 --> E1(TextBlock):::process
    D1 --> F1(Label):::process
    D2 --> E2(TextBlock):::process
    D2 --> F2(Label):::process
    D3 --> E3(TextBlock):::process
    D3 --> F3(Label):::process
~~~

### 对象属性

XAML 是一种声明性语言，XAML 编译器会为每个标签创建一个与之对应的对象。对象创建出来之后要对它的属性进行必要的初始化之后才有使用意义。因为 XAML 语言不能编写程序的运行逻辑，所以一份 XAML文档中除了使用标签声明对象就是初始化对象的属性。

### 对象属性赋值方式

#### 特性（Attribute）语法

一个标签中的 **Attribute** 例有一部分与对象的 **Property** 互相对应，可以直接在元素标签内以 `Attribute=Value ` 的形式来设置属性。这种方式适用于简单类型的属性赋值，如字符串、数字、枚举值等。

```xml
<Button Content="Click Me" Width="100" Height="30" FontSize="14" />
```

在上述代码中，`Content`、`Width`、`Height` 和 `FontSize` 都是 `Button` 元素的属性，通过特性语法直接赋予相应的值。`Content` 属性设置按钮上显示的文本，`Width` 和 `Height` 分别设置按钮的宽度和高度，`FontSize` 设置按钮文本的字体大小。

这种 Attribute=Value 语法赋值时，由于XAML的语法限制，**Value** **只可能是一个字符串值**。

这就引出了问题:
如果一个类能使用 XAML语言进行声明,并允许它的 **Property** 与XAML 标签的 **Attribute** 互相映射，那就需要为这些 **Property** 准备**适当的转换机制**。
由于 Value 是个**字符串**，所以其格式复杂程度有限，尽管可以在转换机制里包含一定的按格式解析字符串的功能以便转换成较复杂的目标对象，这不得不在没有编码辅助的情况下手写一个格式复杂的字符串以满足赋值要求。

例如：

创建了一个自定义控件 `CustomButton`，它有一个 `Color` 类型的属性 `HighlightColor`，用于设置按钮高亮时的颜色。在 XAML 中，可能希望这样设置该属性：

~~~xaml
<local:CustomButton HighlightColor="Red" />
~~~

这里的 `"Red"` 是一个字符串，但 `HighlightColor` 属性需要的是 `Color` 类型的对象。因此，必须有一个转换机制将字符串 `"Red"` 转换为对应的 `Color` 对象。

而如果有一个复杂类型的属性，比如一个结构体，结构体中有许多属性，而需要将字符串映射成结构体中的属性。则需要编写一个很复杂的转换机制。

这时可以使用 **TypeConverter** 类的派生类，并在派生类里重写 **TypeConverter** 的一些方法，来解决这个问题

第二个问题的解决办法就是使用属性元素(PropertyElement)。

#### 属性元素语法

在XAML中，非空标签均具有自己的内容( **Content** )。标签的内容指的就是夹在起始标签和结束标签之间的一些子级标签，每个子级标签都是父级标签内容的一个元素(Element)，简称为父级标签的一个元素。

顾名思义，属性元素指的是某个标签的一个元素对应这个标签的一个属性，即
以元素的形式来表达一个实例的属性。代码描述为:

```xaml
<ClassName>
	<ClassName.PropertyName>
		<!--以对象形式为属性赋值-->
	</ClassName.PropertyName>
</ClassName>
```

实例：

~~~xaml
<Grid>
    <Rectangle x:Name="myRectangle" Width="200" Height="200" >
        <Rectangle.Fill>
            <SolidColorBrush Color="Red" />
        </Rectangle.Fill>
    </Rectangle>
</Grid>
~~~

对于复杂的属性值，可以使用属性元素语法来**避免字符串解析的复杂性**

~~~xaml
<local:CustomChart>
    <local:CustomChart.DataPoints>
        <local:DataPoint X="10" Y="20" />
        <local:DataPoint X="30" Y="40" />
    </local:CustomChart.DataPoints>
</local:CustomChart>
~~~

这样，就可以直接在 XAML 中创建和配置复杂对象，而不需要通过字符串解析来实现

### 标记扩展

标记扩展（**Markup Extension）**是 XAML 中的一种特殊机制，它允许在 XAML 中以一种动态的、灵活的方式为属性 （**Attribute**） **赋值**。在 XAML 里，属性通常以简单的字符串值进行赋值，但对于一些复杂的、需要动态计算或者引用外部资源的情况，标记扩展就发挥了重要作用。标记扩展以大括号 `{}` 包裹特定的关键字和参数来表示，XAML 解析器会在运行时对这些标记扩展进行处理，并将其转换为合适的对象或值赋给相应的属性。

#### 语法

~~~xaml
{ExtensionName Parameter1, Parameter2, ...}
~~~

-   `ExtensionName`：这是标记扩展的名称，它表明了要使用的具体标记扩展类型，例如 `Binding`、`StaticResource` 等。
-   `Parameter1, Parameter2, ...`：这些是传递给标记扩展的参数，参数之间使用逗号分隔。参数可以是简单的值，也可以是更复杂的表达式或其他标记扩展，参数值不用加引号。 

#### 用处

##### 资源共享

在实际开发中，可能会有多个元素需要使用同一个资源，如相同的画笔、样式等。如果每次都重新创建这些资源，会造成资源的浪费，并且不利于代码的维护。

~~~xaml
<Window.Resources>
    <SolidColorBrush x:Key="MyBrush" Color="Red"/>
</Window.Resources>
<StackPanel>
    <Button Background="{StaticResource MyBrush}" Content="Button 1"/>
    <Button Background="{StaticResource MyBrush}" Content="Button 2"/>
</StackPanel>
~~~

这里通过 `StaticResource` 标记扩展，两个 `Button` 的 `Background` 属性都引用了同一个 `MyBrush` 资源实例，避免了重复创建。

-   **`DynamicResource`**：与 `StaticResource` 类似，但 `DynamicResource` 会在运行时动态解析资源。当资源的值发生变化时，使用 `DynamicResource` 引用该资源的属性也会相应更新。

##### 数据绑定

在很多应用程序中，需要将界面元素的属性与数据源的属性进行绑定，以实现数据的动态更新。`Binding` 标记扩展就是专门用于解决这个问题的。它允许在运行时将一个属性的值绑定到另一个属性，实现数据的双向或单向同步。

有时候需要将对象的属性设置为 `null` 值，XAML 提供了 `x:Null` 标记扩展来实现这一需求。例如：

~~~xaml
<StackPanel>
    <TextBox x:Name="txtInput" Text="Initial Value"/>
    <TextBlock Text="{Binding Text, ElementName=txtInput}"/>
</StackPanel>
~~~

在这个例子中，`TextBlock` 的 `Text` 属性通过 `Binding` 标记扩展绑定到 `TextBox` 的 `Text` 属性。当 `TextBox` 中的文本发生变化时，`TextBlock` 中的文本也会相应更新。

##### 复杂对象创建和初始化

对于一些复杂的对象，可能需要在 XAML 中进行复杂的初始化操作。标记扩展可以帮助简化这个过程。例如，`ObjectDataProvider` 标记扩展可以用于创建和初始化对象，并将其作为数据源使用。

~~~xaml
<Window.Resources>
    <ObjectDataProvider x:Key="MyDataProvider" ObjectType="{x:Type local:MyDataClass}" MethodName="GetData"/>
</Window.Resources>
<ListBox ItemsSource="{Binding Source={StaticResource MyDataProvider}}"/>
~~~

在这个例子中，`ObjectDataProvider` 标记扩展创建了一个 `MyDataClass` 对象，并调用其 `GetData` 方法获取数据，然后将这些数据绑定到 `ListBox` 的 `ItemsSource` 属性上。

##### 空值赋值

有时候需要将对象的属性设置为 `null` 值，XAML 提供了 `x:Null` 标记扩展来实现这一需求。例如：

~~~xaml
<Button Content="Clear Image" ImageSource="{x:Null}"/>
~~~

这里将 `Button` 的 `ImageSource` 属性设置为 `null`，表示不显示图像。

### 事件处理和代码后置

在 XAML 中，标签对应着对象，标签的特征（Attribute）可分为两类，一类对应对象的属性（Property），用于设置对象的各种特性，比如 `Button` 的 `Width`、`Height`、`Content` 等属性；另一类则对应对象的事件（Event），比如 `Button` 的 `Click` 事件。

在 .NET 的事件处理机制里，事件是一种消息通知机制，当特定的操作发生时（如按钮被点击），对象会触发相应的事件。为了对事件进行响应和处理，需要为事件指定一个与之匹配的成员函数，这个函数就是 “事件处理器”（**EventHandler**）。在 WPF 中，允许直接在 XAML 里为对象的事件指定事件处理器，通过将事件处理器的函数名赋值给对应对象事件的属性来实现。

示例：

~~~xaml
<Window x:Class="WpfApp1.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="MainWindow" Height="350" Width="525">
    <Grid>
        <Button Content="Click Me" Click="Button_Click" HorizontalAlignment="Left" Margin="212,135,0,0" VerticalAlignment="Top" Width="75"/>
    </Grid>
</Window>
~~~

在上述代码中，`<Button>` 标签的 `Click` 属性被赋值为 `Button_Click`，这表示当按钮被点击时，会调用名为 `Button_Click` 的事件处理器函数。

~~~c#
using System.Windows;

namespace WpfApp1
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Button was clicked!");
        }
    }
}
~~~

在 C# 代码中，定义了 `Button_Click` 事件处理器函数。该函数有两个参数：

-   `object sender`：表示触发事件的对象，在这里就是被点击的 `Button`。
-   `RoutedEventArgs e`：包含了事件的相关信息，例如事件的路由策略等。

当用户点击按钮时，.NET 运行时会自动调用 `Button_Click` 函数，弹出一个消息框显示 “Button was clicked!”。

代码后置（**Code - Behind**）是一种在开发基于 XAML 的应用程序（如 WPF、UWP 等）时广泛采用的编程模式。它的核心思想是将用户界面（UI）的设计和程序逻辑的实现分开，使得 UI 设计和逻辑编程可以由不同的人员或团队并行开展，提高开发效率和代码的可维护性。

-   **C# 的 partial 类**：在 C# 中，`partial` 关键字允许将一个类的定义拆分到多个文件中。这些文件在编译时会被合并成一个完整的类。这为 “代码后置” 提供了语言层面的支持，使得可以将 UI 相关的部分和逻辑处理的部分分别放在不同的文件中定义同一个类。
-   **XAML 的 `x:Class` 特性**：在 XAML 文件中，`x:Class` 特性用于指定该 XAML 文件解析生成的类将与哪个 C# 类合并。

### 程序集的导入和引用

大多数情况下，根据架构设计一个程序会被分成若干个相对独立的模块来编写，每个模块可以独立编译、进行版本升级。模块与模块之间有时会存在一些依赖关系，即有些模块需要“借用”其他模块中的功能。**.NET的模块称为程序集（Assembly)**。一般情况下，**一个解决方案就是一个完整的程序**。解决方案中会包含若干个项目(Project)，**每个项目是可以独立编译的，它的编译结果就是一个程序集。**常见的程序集是以.exe为扩展名的可执行程序或者是以.dll为扩展名的动态链接库。

~~~
.exe -> 可执行文件
.dll -> 动态链接库
它们都是程序集
~~~

大多数情况下，引用其他程序集的时候，说的都是动态链接库。因为.NET编程接口（ApplicationProgrammingInterface，API)以类和类级别的单元为主（Win32API是以函数为主)，所以我们又常把引用程序集说成是引用类库。

类库中的类一般都会安置在合适的名称空间中，名称空间的作用是**避免同名类的冲突**。比如个程序中引用了LibA.dll和LibB.dll两个类库，这两个类库中都有一个叫Converter的类，如果没有名称空间来限定的话，编译器将分不清程序员打算使用哪个类。如果LibA.dll中的Converter放在一个名为Microsoft 的名称空间里，LibB.dll 中的Converter放在名为Google名称空间里，程序员就可以通过Microsoft.Converter和Google.Converter来区分这两个类了。

~~~
直接使用 Converter 
编译器不清楚使用哪个Converter
加上命名空间 Microsoft.Converter，Google.Converter
编译器可以通过命名空间来确定哪个 Converter
~~~

引用类库的步骤

1.  编写类库项目并编译得到.dll文件或者获得别人编译的.dll文件。
2.  将类库项目或者.dll文件引用进自己的项目。
3.  在C#和XAML中引用类库中的名称空间。

XAML引用命名空间语法

~~~xaml
xmlns:映射名="clr-namespace:类库中名称空间的名字;assembly-类库文件名"
~~~

eg：对于MyLibrary.dll里的两个名称空间

XAML中的引用会是：
~~~xaml
xmlns:controls="clr-namespace:Controls;assembly=MyLibrary"
xmlns:common="clr-namespace:Common;assembly=MyLibrary"
~~~

语法分析：

1.  xmIns是用于在XAML中声明名称空间的Attribute，它从XML语言继承而来，是XMLNamespace的缩写。
2.  冒号后的映射名是可选的，但由于可以不加映射名的默认名称空间已经被WPF的主要名称空间占用，所以所引用的名称空间都需要加上这个映射名。
3.  映射名可以根据喜好自由选择，但团队内部最好使用一致的命名。一个建议就是使用类库中名称空间的原名或者缩写。
4.  引号中的字符串值确定了要引用的是哪个类库以及类库中的哪个名称空间。XAML编辑器可以帮助自动填充。

将命名空间引入XAML文档，就可以使用当中的类了

语法：

~~~xaml
<映射名：类名>...</映射名：类名>
~~~

例如使用Common和Controls中的类：

~~~xaml
<common:MessagePanel x:Name="window1"/>
<controls:LedButton x:Name="button1"/>
~~~

## 命名空间详解



## WPF控件

WPF 控件是能够展示数据、响应用户操作的 **UI 元素**，本质上是数据和行为的载体，是一种非常抽象的概念，不依赖于固定的外观形象。它将数据展示和用户交互功能封装在一起，为用户提供了与应用程序进行交互的接口。

### 常见控件类型

1.  **布局控件**：能容纳多个控件或嵌套其他布局控件，用于在 UI 上对控件进行组织和排列，如 Grid、StackPanel、DockPanel 等，共同父类为 Panel。
2.  **内容控件**：仅能容纳一个其他控件或布局控件作为自身内容，像 Window、Button 等，常需借助布局控件规划内容，共同父类是 ContentControl。
3.  **带标题内容控件**：类似内容控件，可添加标题（Header），标题部分也能容纳控件或布局，典型代表有 GroupBox、TabItem 等，共同父类是 HeaderedContentControl。
4.  **条目控件**：用于显示一列类型通常相同的数据，如 ListBox、ComboBox 等，共同基类是 ItemsControl，在显示集合类型数据方面功能强大。
5.  **带标题条目控件**：相当于条目控件增加了标题显示区，如 TreeViewItem、MenuItem 等，常用于显示层级关系数据，结点在 Header 区域显示，子级结点在条目控件区域显示，共同基类是 HeaderedItemsControl。
6.  **特殊内容控件**：较为独立，如 TextBox 容纳字符串、TextBlock 容纳可自由控制格式的文本、Image 容纳图片类型数据等 。

~~~mermaid
%%{init: {'theme':'dark'}}%%
flowchart BT
	a[...]
	b[DependencyObject]
	c[Visual]
	d[UIElement]
	e[FramworkElement]
	f[Panel]
	h[Control]
	g[TextBlock]
	i[Image]
	j[ContenControl]
	k[ItemControl]
	l[TextBox]
	m[HeaderedContentControl]
	n[HeaderedItemsControl]
b-->a
c-->b
d-->c
e-->d
f-->e
g-->e
h-->e
i-->e
j-->h
k-->h
l-->h
m-->j
n-->k
~~~

### 内容模型

将控件想象成一个容器，它里面可以装一些东西，可以是一些数据也可以是另一个控件

根据控件能装什么内容可以将UI元素分为以下这么多种

| 名称                   | 注释                           |
| ---------------------- | ------------------------------ |
| ContentControl         | 单一内容控件                   |
| HeaderedContentControl | 带标题的单一内容控件           |
| ItemsControl           | 以条目集合为内容的控件         |
| HeaderedItemsControl   | 带标题的以条目集合为内容的控件 |
| Decorator              | 控件装饰元素                   |
| Panel                  | 面板类元素                     |
| Adorner                | 文字点缀元素                   |
| Flow Text              | 流式文本元素                   |
| TextBox                | 文本输入框                     |
| TextBlock              | 静态文字                       |
| Shape                  | 图形元素                       |

控件是内存中的**对象**，控件的内容也是内存中的对象。

**控件通过自己的某个属性引用着作为其内容的对象，这个属性称为内容属性（Content Property)**。

“内容属性”是个统称，具体到每种控件上，内容属性都有自己确切的名字—有的直接就叫Content，有的叫Child；有些控件的内容可以是集合，其内容属性有叫Items或Children的。

### 内容模型简单介绍

把符合某类内容模型的UI元素称为一个族，每个族用它们共同基类来命名。

#### ContenControl 族

该族元素特点

-   都派生自 ContentControl类
-   它们都是控件（Control）
-   内容属性名称为 Content
-   只能由单一元素充当其内容

eg： Button控件

~~~xaml
<StackPanel>
     <Button Margin="10,10,10,10">
         <TextBlock Text="114514"/>
     </Button>
     <Button Margin="10,10,10,10">
         <TextBlock Text="114514"/>
     </Button>
</StackPanel>
<!-- 只能接受一个元素作为它的 Content -->
~~~

包含的控件

| 控件名称             |
| -------------------- |
| CheckBox             |
| ComboBoxItem         |
| Button               |
| ButtonBase           |
| GroupItem            |
| Frame                |
| GridViewColumnHeader |
| NavigationWindow     |
| ContentControl       |
| ListBoxItem          |
| ListViewItem         |
| StatusBarItem        |
| Label                |
| RepeatButton         |
| ScrollViewer         |
| RadioButton          |
| Window               |
| ToolTip              |
| UserControl          |
| ToggleButton         |

#### HeaderedContentControl 族

-   都派生自HeaderedContentControl 类，HeaderedContentControl 是ContenControl的派生类
-   都是控件，用于显示带标题的数据
-   除了显示主题的区域外，控件还有一个显示标题（Header）的区域
-   内容属性为 Conten 和 Header
-   无论是 Conten 还是 Header 都只能容纳一个元素作为其内容

包含的控件如下

| 控件名称               |
| ---------------------- |
| TabItem                |
| GroupBox               |
| Expander               |
| HeaderedContentControl |

eg：GroupBox

~~~xaml
<Grid>
    <GroupBox Margin="10" BorderBrush="Gray">
        <GroupBox.Header>
            <TextBlock Text="114514"/>
        </GroupBox.Header>
        <TextBlock TextWrapping="WrapWithOverflow" Margin="10">
            <TextBlock.Text>
                LUCK
            </TextBlock.Text>
        </TextBlock>
    </GroupBox>
</Grid>
~~~

#### ItemsControl 族

-   都派生自 ItemsControl 类
-   都是控件，用于显示列表化的数据
-   内容属性为 Items 或 ItemSource
-   每一种 ItemsControl 都对应有自己的条目容器（Item Container）

包含的控件

| 控件名称     |
| ------------ |
| ContextMenu  |
| ComboBox     |
| Menu         |
| MenuBase     |
| ListView     |
| TabControl   |
| ListBox      |
| ItemsControl |
| Selector     |
| StatusBar    |
| TreeView     |

本族控件会自动使用**条目容器**对提交给它的内容进行**包装**。

合法的`ItemsControl`内容一定是个集合，当我们把这个集合作为内容提交给`ItemsControl`时，`ItemsControl`不会把这个集合直接拿来用，而是使用自己对应的条目容器把集合中的条目逐个包装，然后再把包装好的条目序列当作自己的内容。这种自动包装的好处就是允许程序员向`ItemsControl`提交各种数据类型的集合，程序员在思考问题时会自然而然地感觉到`ItemsControl`控件直接装载着数据，如果需要进行增加、删除、更新或者排序，那么直接去操作数据集合就可以，UI会自动将改变展现出来。这正体现了在WPF开发时是数据直接驱动UI再进行显示。

eg: ListBox

~~~xaml
<Grid>
	<ListBox Margin="5">
		<CheckBox x:Name="checkBoxTim" Content-"Tim"/>
		<CheckBox x:Name="checkBoxTom" Content-"Tom"/>
		<CheckBox x:Name="checkBoxBruce" Content-"Bruce"/>
		<Button x:Name="buttonMess" Content-"Mess"/>
		<Button x:Name="buttonOwen" Content="Owen"/>
		<Button x:Name="buttonVictor" Content="Victor"/>
	</ListBox>
</Grid>
~~~

 **ItemsControl 对应的 Item Container**

| ItemsControl 名称 | 对应的 Item container |
| ----------------- | --------------------- |
| ComboBox          | ComboBoxItem          |
| ContextMenu       | MenuItem              |
| ListBox           | ListBoxItem           |
| ListView          | ListViewItem          |
| Menu              | MenuItem              |
| StatusBar         | StatusBarItem         |
| TabControl        | TabItem               |
| TreeView          | TreeViewItem          |

#### HeaderedItemsControl

-   都派生自 HeaderedItemsControl 类
-   它们都是控件，用于显示列表化的数据，同时可以显示一个标题
-   内容属性为 Items，ItemSource 和 Header

使用与ItemsControl族类似，只是多了个标题

只有三个控件

| 控件名称     |
| ------------ |
| MenuItem     |
| TreeViewItem |
| ToolBar      |

eg：MenuItem

~~~xaml
<DockPanel>
    <!-- 创建菜单栏 -->
    <Menu DockPanel.Dock="Top">
        <!-- 第一个主菜单项 -->
        <MenuItem Header="文件">
            <!-- 子菜单项 -->
            <MenuItem Header="新建" />
            <MenuItem Header="打开" />
            <MenuItem Header="保存" />
        </MenuItem>
        <!-- 第二个主菜单项 -->
        <MenuItem Header="编辑">
            <MenuItem Header="复制" />
            <MenuItem Header="粘贴" />
        </MenuItem>
    </Menu>
</DockPanel>
~~~

#### Decorator 族

用来在UI上起装饰作用的

-   都派生自 Decorator 类
-   其UI修饰作用
-   内容属性为 Child
-   只能由单一元素充当内容

此族元素

| 名称                   |
| ---------------------- |
| ListBoxChrome          |
| SystemDropShadowChrome |
| ButtonChrome           |
| ClassicBorderDecorator |
| BulletDecorator        |
| Viewbox                |
| Border                 |
| InkPresenter           |
| AdornerDecorator       |

eg：border 元素

~~~xaml
<DockPanel>
    <!-- 创建菜单栏 -->
    <Border BorderBrush="Blue" BorderThickness="2" CornerRadius="10" Padding="5">
    <Menu DockPanel.Dock="Top">
        <!-- 第一个主菜单项 -->
        <MenuItem Header="文件">
            <!-- 子菜单项 -->
            <MenuItem Header="新建" />
            <MenuItem Header="打开" />
            <MenuItem Header="保存" />
        </MenuItem>
        <!-- 第二个主菜单项 -->
        <MenuItem Header="编辑">
            <MenuItem Header="复制" />
            <MenuItem Header="粘贴" />
        </MenuItem>
    </Menu>
    </Border>
</DockPanel>
~~~

#### Shape 族元素

它们只是简单的视觉元素，并不是控件，是用来专门用来在UI上绘制图形的一类元素，这些元素没有自己的内容，可以使用Fill属性为它们设置填充效果，还可以使用 Stroke 属性为它们设置边线的效果

-   都派生自 Shape 类
-   用于 2D 图形绘制
-   没有内容属性
-   使用 Fill 属性设置填充，使用 Stroke 属性设置边线

eg：Line Polyline Rectangle

~~~xaml
 <DockPanel>
     <Line X1="0" Y1="0" X2="100" Y2="100" Stroke="Black" StrokeThickness="2"/>
     <Polyline Points="50,50 100,100 150,50 200,100 50,50" Stroke="Blue" StrokeThickness="3"/>
     <Rectangle Width="150" Height="100" Fill="LightBlue" Stroke="Black" StrokeThickness="2"/>
 </DockPanel>
~~~



#### Panel 族元素

用于UI布局的元素

-   都派生自 Panel 抽象类
-   主要用于控制UI布局
-   内容属性为Children
-   内容可以为多个元素，Panel元素将控制它们的布局

对比`ItemsControl`和`Panel`元素，虽然内容都可以是多个元素，但`ItemsControl`强调以列表的形式来展现数据。

`Panel`则强调对包含的元素进行布局，所以`ItemsControl`的内容属性是`Items`和`ItemsSource`而Panel的内容属性名为`Children`。

此族元素

| 控件名称               |
| ---------------------- |
| Grid                   |
| TabPanel               |
| DockPanel              |
| Canvas                 |
| StackPanel             |
| ToolBarPanel           |
| UniformGrid            |
| WrapPanel              |
| ToolBarOverflowPanel   |
| VirtualizingPanel      |
| VirtualizingStackPanel |

#### 其它控件

##### TextBlock 和TextBox

这两个控件最主要的功能是显示文本。`TextBlock`只能显示文本，**不能编辑**，所以又称静态文本。

TextBox则**允许用户编辑**其中的内容。

TextBlock虽然不能编辑内容，但可以使用丰富的印刷级的格式控制标记显示专业的排版效果。
TextBox不需要太多的格式显示，所以它的内容是简单的字符串，内容属性为Text。

TextBlock由于需要操纵格式，所以内容属性是Inlines（印刷中的“行”)，同时，TextBlock也保留一个名为Text的属性，当简单地显示一个字符串时，可以使用这个属性。

~~~xaml
<Grid>
    <!-- 使用Text属性简单显示文本 -->
    <TextBlock  Text="这是一个简单的TextBlock示例" HorizontalAlignment="Left" Margin="20,20,0,0"/>

    <!-- 使用Inlines属性实现丰富的排版效果 -->
    <TextBlock HorizontalAlignment="Left" Margin="20,50,0,0">
        <Run Text="这是一段包含 " />
        <Bold><Run Text="加粗样式" /></Bold>
        <Run Text=" 和 " />
        <Italic><Run Text="斜体样式" /></Italic>
        <Run Text=" 的文本。" />
    </TextBlock>
</Grid>
~~~



## WPF布局

在软件开发尤其是界面设计领域，布局指的是对界面中各种元素（如文本框、按钮、图像等）进行合理的排列和组织，以达到美观、易用和高效的用户体验目的。

`WPF`的布局是依靠各种布局元素实现的。布局元素中，既有像传统的Windows Form和`ASP.NET`那样使用绝对坐标进
行定位的元素，也有像HTML页面中那样使用行列定位的元素。只有对各个布局元素了如指掌才能使用最简洁的XAML和
C#代码实现让用户赏心悦目的静态界面和动画。

### 布局元素

传统的`WindowsForm`或ASP.NET开发中，一般是把窗体或页面当作一个以左上角为原点的**坐标系**。窗体或页面上的控件依靠这个坐标系来布局，布局的办法就是调整控件在这个坐标系中的横纵坐标值。这样一来，控件与控件之间的关系要么就是相邻要么就是叠压。

同时`WPF`控件有了 `Conten` 的概念所以控件与控件之间可以有包含关系。而WPF的布局理念就是把一个布局元素作为`ContentControl`或`HeaderedContentControl`族控件的`Content`，再在布局元素里添加要被布局的子级控件，如果UI局部需要更复杂的布局，那就在这个区域放置一个子级的布局元素，形成布局元素的嵌套。

WPF中的布局元素主要有以下几种：

-   Grid：网格。可以自定义行和列并通过行列的数量、行高和列宽来调整控件的布局。近似于HTML中的Table。
-   StackPanel：栈式面板。可将包含的元素在竖直或水平方向上排成一条直线，当移除一个元素后，后面的元素会自动向前移动以填充空缺。
-   Canvas：画布。内部元素可以使用以像素为单位的绝对坐标进行定位，类似于WindowsForm编程的布局方式。
-   DockPanel：泊靠式面板。内部元素可以选择泊靠方向，类似于在WindowsForm编程中设置控件的Dock属性。
-   WrapPanel:自动折行面板。内部元素在排满一行后能够自动折行，类似于HTML中的流式布局。

### Grid布局

Grid元素会以网格的形式对内容元素（及其Children）进行布局

#### 布局特点

-   可以定义任意数量的行和列，非常灵活
-   行的高度和列的宽度可以使用绝对数值、相对比例或自动调整的方式进行精确设定，并可设置最大和最小值
-   内部元素可以设置自己的所在的行和列，还可以设置自己纵向跨几行、横向跨几列
-   可以设置Children元素的对齐方向

基于这些特点，Grid适用的场合有：

-   UI布局的大框架设计
-   大量UI元素需要成行或者成列对齐的情况
-   UI整体尺寸改变时，元素需要保持固有的高度和宽度比例
-   UI后期可能有较大变更或扩展

#### 使用方法

##### 定义Grid的行与列

`Grid`类具有`ColumnDefinitions`和`RowDefinitions`两个属性，它们分别是`ColumnDefinition`和`RowDefinition`的集合，表示`Grid`定义了多少列、多少行。例如下面的代码：

~~~xaml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition/>
        <RowDefinition/>
        <RowDefinition/>
        <RowDefinition/>
    </Grid.RowDefinitions>
    <Grid.ColumnDefinitions>
        <ColumnDefinition/>
        <ColumnDefinition/>
        <ColumnDefinition/>
        <ColumnDefinition/>
        <ColumnDefinition/>
    </Grid.ColumnDefinitions>
</Grid>
~~~

![QQ20250307-172614](G:\study\c# pic\QQ20250307-172614.png)

设计器中会显示分成四行五列的样子，但是需要设置行和列的高度和宽度才能形成有效的布局

宽度和高度的单位

| 中文名称 | 英文名称   | 换算关系              | 默认单位及说明         |
| -------- | ---------- | --------------------- | ---------------------- |
| 像素     | Pixel      | 无（为图形基本单位）  | px（默认单位，可省略） |
| 英寸     | Inch       | 1inch = 96 pixel      | in                     |
| 厘米     | Centimeter | 1cm = (96/2.54) pixel | cm                     |
| 点       | Point      | 1pt = (96/72) pixel   | pt                     |

所有单位在设计器中的大小，顺序从上到下

~~~xaml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="30px"/>
        <RowDefinition Height="30"/>
        <RowDefinition Height="0.5in"/>
        <RowDefinition Height="1cm"/>
        <RowDefinition Height="30pt"/>
    </Grid.RowDefinitions>
</Grid>
~~~

![QQ20250307-173457](G:\study\c# pic\QQ20250307-173457.png)

单位注意：

-   属性的值为 double类型
-   因为像素是默认单位，所以px可以省略
-   其他单位也会被转换成像素并显示在Grid的边缘处

同时对于Grid的行高和列宽，可以设置三类值

-   绝对值：double数值加单位后缀（上面代码所示）
-   比例值：double数值后加一个星号(“*”)
-   自动值：字符串Auto

比例值是在double类型数据后加一个星号$*$。 解析器会把所有比例值的数值加起来作为分母、把每个比例值的数值作为分子，再用这个分数值乘以未被占用空间的像素数，得到的结果就是分配给这个比例值的最终像素数。比如一个总高度为150px的Grid，它包含5行，其中两行采用绝对值25px，其他三行分别是$2*$、$1*$、$2*$，使用上面的计算方法，这三行分配的像素数应该是40px、20px 和 40px。

比例值最大的特点是当UI的整体尺寸改变后，它会保持固有的比例。

eg：

~~~xaml
<Grid x:Name="myGrid" Loaded="Grid_Loaded" >
    <Grid.RowDefinitions>
        <RowDefinition Height="25"/>
        <RowDefinition Height="4"/>
        <RowDefinition Height="1*"/>
        <RowDefinition Height="*"/>
    </Grid.RowDefinitions>
</Grid>
~~~

效果：

<img src="G:\study\c# pic\QQ20250307-203401.png" alt="QQ20250307-203401" style="zoom:67%;" />

缩小后：

![QQ20250307-203501](G:\study\c# pic\QQ20250307-203501.png)

当改变容器的尺寸时，使用绝对值的行高不会改变，而使用比例值的行高会保持固有比例。

而且行高和列宽的默认形式就是比例值，所以如果没有显式指定行高或列宽时，默认值就是1*，1 *又可以简写为 *。

如果使用自动值（字符串“Auto”）为行高或列宽赋值，那么行高或列宽的实际值将由行列内控件的高度和宽度进行，就是里面控件会把行列”撑“开，但如果没有控件则行高和列宽则为0。

使用 Grid 进行布局

设计图

<img src="G:\study\c# pic\QQ20250307-211459.png" alt="QQ20250307-211459" style="zoom:67%;" />

代码

~~~XAML
<Window x:Class="WpfApp2.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:WpfApp2;assembly=WpfApp2"
        xmlns:userControl="clr-namespace:WpfApp2.view.UserControl"
        xmlns:local1="clr-namespace:WpfApp2.Person"
        mc:Ignorable="d"
        Title="MainWindow" Height="240" Width="400"  MinWidth="300" MinHeight="140">
    <Window.Resources>
        <local1:Person x:Key="person" Name="John" Age="30" />
    </Window.Resources>
    <Grid x:Name="myGrid" Loaded="Grid_Loaded" Margin="0,10,0,10" >
        <Grid.RowDefinitions>
            <RowDefinition Height="25"></RowDefinition>
            <RowDefinition Height="4"></RowDefinition>
            <RowDefinition Height="*"></RowDefinition>
            <RowDefinition Height="4"></RowDefinition>
            <RowDefinition Height="25"></RowDefinition>
        </Grid.RowDefinitions>
        <TextBox Grid.Row="2" Text="114514" Grid.ColumnSpan="5" Margin="10,0,10,0" BorderBrush="Black" BorderThickness="1" />
        <Grid Grid.Row="0" Margin="10,0,10,0">
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="Auto"></ColumnDefinition>
                <ColumnDefinition Width="*"></ColumnDefinition>
            </Grid.ColumnDefinitions>
            <TextBlock Text="你好,请选择你的部门并留言:  " Grid.Column="0" VerticalAlignment="Center"></TextBlock>
            <ComboBox Grid.Column="1" Grid.ColumnSpan="4"></ComboBox>
        </Grid>
        <Grid Grid.Row="4">
        <Grid.ColumnDefinitions >
            <ColumnDefinition Width="*"></ColumnDefinition>
            <ColumnDefinition Width="80"></ColumnDefinition>
            <ColumnDefinition Width="4"></ColumnDefinition>
            <ColumnDefinition Width="80"></ColumnDefinition>
        </Grid.ColumnDefinitions>
            <Button Grid.Column="1" Content="提交"></Button> 
            <Button Grid.Column="3" Content="清空" Margin="0,0,10,0"></Button> 
        </Grid>
    </Grid>
</Window>
~~~

实际效果：

![QQ20250307-211540](G:\study\c# pic\QQ20250307-211540.png)

为控件指定行和列遵循以下规则:

-   行和列都是从0开始计数
-   指定一个控件在某行，就为这个控件的标签添加Grid.Row="行编号”这样一个Attribute，若行编号为0（即控件处于首行）则可省略这个Attribute
-   指定一个控件在某列，就为此控件添加Grid.Column="列编号”这样的Attribute，若列编号为0则Attribute可以省略不写
-   若控件需要跨多个行或列，请使用 Grid.RowSpan="行数"和Grid.ColumnSpan="列数”两个Attribute

注：如果把两个元素放在Grid的**同一个单元格**内，则代码中后**书写的元素将盖在先书写的元素之上**，如果想让盖在后面的元素显示出来，可以把**上面元素的Visibility设置为Hidden或Collapsed**，也可以把**上面元素的Opacity属性设置为0**

### StackPanel布局

它可以将内部元素在纵向上或横向上紧凑排列形成栈式布局，简单来说就是把内部元素像搭积木一样**摞起来**，当把排在前面的积木块抽掉之后排在它后面的元素会整体向前移动，补占原有元素的空间。

基于此，它适合的场景有：

-   同类元素需要紧凑排列（如制作菜单或者列表）
-   移除其中的元素后能够自动补缺的布局或者动画

StackPanel使用3个属性来控制内部元素的布局，它们是Orientation、HorizontalAlignment和VerticalAlignment

| 属性名称            | 数据类型                 | 可取值     | 描述                                       |
| ------------------- | ------------------------ | ---------- | ------------------------------------------ |
| Orientation         | Orientation 枚举         | Horizontal | 决定内部元素是横向累积                     |
| Orientation         | Orientation 枚举         | Vertical   | 决定内部元素是纵向累积                     |
| HorizontalAlignment | HorizontalAlignment 枚举 | Left       | 决定内部元素水平方向上的对齐方式为左对齐   |
| HorizontalAlignment | HorizontalAlignment 枚举 | Center     | 决定内部元素水平方向上的对齐方式为居中对齐 |
| HorizontalAlignment | HorizontalAlignment 枚举 | Right      | 决定内部元素水平方向上的对齐方式为右对齐   |
| HorizontalAlignment | HorizontalAlignment 枚举 | Stretch    | 决定内部元素在水平方向上拉伸以填充可用空间 |
| VerticalAlignment   | VerticalAlignment 枚举   | Top        | 决定内部元素竖直方向上的对齐方式为顶部对齐 |
| VerticalAlignment   | VerticalAlignment 枚举   | Center     | 决定内部元素竖直方向上的对齐方式为居中对齐 |
| VerticalAlignment   | VerticalAlignment 枚举   | Bottom     | 决定内部元素竖直方向上的对齐方式为底部对齐 |
| VerticalAlignment   | VerticalAlignment 枚举   | Stretch    | 决定内部元素在竖直方向上拉伸以填充可用空间 |

eg：简单选词界面

~~~xaml
<Grid>
    <GroupBox Header="请选择没有错别字的成语" BorderBrush="Black" Margin="5">
        <StackPanel Margin="5">
            <CheckBox Content="A 迫不及待"></CheckBox>
            <CheckBox Content="B 首屈一指"></CheckBox>
            <CheckBox Content="C 陈词滥调"></CheckBox>
            <CheckBox Content="D 唉声叹气"></CheckBox>
            <CheckBox Content="3 不可理喻"></CheckBox>
            <StackPanel Orientation="Horizontal" HorizontalAlignment="Right">
                <Button Content="清空" Width="60" Margin="5"></Button>
                <Button Content="确定" Width="60" Margin="5"></Button>
            </StackPanel>
        </StackPanel>
    </GroupBox>
</Grid>
~~~

![QQ20250307-220042](G:\study\c# pic\QQ20250307-220042.png)

eg：希望菜单里的每个条目在被点击后，能脱离原位置，在主显示区域展开为一张地图，同时让后面的条目自动向前移动填补空缺，这种情况下，StackPanel 堪称最佳选择。

~~~xaml
<Grid>
    <StackPanel Orientation="Vertical"  x:Name="MenuStackPanel">
        <!-- 第一个菜单项 -->
        <Button Content="菜单条目1" Click="MenuItem_Click"/>
        <!-- 第二个菜单项 -->
        <Button Content="菜单条目2" Click="MenuItem_Click"/>
        <!-- 第三个菜单项 -->
        <Button Content="菜单条目3" Click="MenuItem_Click"/>
    </StackPanel>
    <!-- 用于显示地图的区域，初始状态不显示任何内容 -->
    <Grid Name="MapDisplayGrid" Visibility="Collapsed">
        <!-- 这里可以放置地图相关的控件，例如使用Image控件显示地图图片，假设地图图片为map.jpg -->
        <Image Source="map.jpg" Stretch="Uniform"/>
    </Grid>
</Grid>
~~~

后台c#代码

~~~c#
private void MenuItem_Click(object sender, RoutedEventArgs e)
{
    MenuStackPanel.Children.Remove((UIElement)sender);
    MapDisplayGrid.Visibility = Visibility.Visible;
}
~~~

效果展示

![QQ20250307-215758](G:\study\c# pic\QQ20250307-215758.png)

点击一个按钮

![QQ20250307-215803](G:\study\c# pic\QQ20250307-215803.png)

### Canvas 布局

Canvas译成中文就是“画布”，显然，在Canvas里布局就像在画布上画控件一样。使用Canvas布局与在WindowsForm窗体上布局基本上是一样的，只是在Windows Form开发时通过设置控件的Left和Top等属性来确定控件在窗体上的位置，而WPF的控件没有Left 和 Top等属性，就像把控件放在Grid里时会被附加上Grid.Column和Grid.Row属性一样，当控件被放置在Canvas里时就会被附加上 Canvas.X和Canvas.Y属性。

Canvas适合的布局有：

-   一经设计基本上不会再有改动的小型布局（如图标）
-   艺术性比较强的布局
-   需要大量使用横纵坐标进行绝对点定位的布局
-   依赖于横纵坐标的动画

eg：简单登录框

~~~xaml
<Canvas>
    <TextBlock Text="用户名：" Canvas.Left="12" Canvas.Top="12"></TextBlock>
    <TextBox Height="20" Width="200" BorderBrush="Black" Canvas.Left="66" Canvas.Top="9" ></TextBox>
    <TextBlock Text="密码：" Height="16" Width="36" Canvas.Left="12" Canvas.Top="40.72"></TextBlock>
    <TextBox Height="23" Width="200" BorderBrush="Black" Canvas.Left="66" Canvas.Top="38" ></TextBox>
    <Button Content="确认" Width="80" Height="22" Canvas.Left="100" Canvas.Top="67"></Button>
    <Button Content="消除" Width="80" Height="22" Canvas.Left="186" Canvas.Top="67"></Button>
</Canvas>
~~~

效果：

![QQ20250308-103304](G:\study\c# pic\QQ20250308-103304.png)

与Grid一样，如果两个元素在Canvas内部占据相同的位置，亦是代码中后书写的元素会覆盖在先书写的元素之上。想要显露盖在下面的元素，可以在代码中修改上面元素的Visibility属性值或Opacity属性值。

### DockPanel布局

DockPanel内的元素会被附加上DockPanel.Dock这个属性，这个属性的数据类型为Dock枚举。Dock枚举可取Left、Top、Right和 Bottom四个值。根据Dock属性值，DockPanel内的元素会向指定方向累积、切分DockPanel内部的剩余可用空间，就像船舶靠岸一样。DockPanel还有一个重要属性——bool类型的LastChildFill,它的默认值是True。当LastChildFill
属性的值为True时，DockPanel内最后一个元素的DockPanel.Dock属性值会被忽略，这个元素会把DockPanel内部所有剩余空间充满。这也正好解释了为什么Dock枚举类型没有Fill这个值。

eg：使用DockPanel分割区域

~~~xaml
<Grid>
    <DockPanel>
        <TextBox DockPanel.Dock="Top" Height="40" BorderBrush="Black" Text="top"></TextBox>
        <TextBox DockPanel.Dock="Left" Width="65" BorderBrush="Black" Text="left"></TextBox>
        <TextBox  BorderBrush="Black" Text="right"></TextBox>
    </DockPanel>
</Grid>
~~~

效果：

![QQ20250308-104157](G:\study\c# pic\QQ20250308-104157.png)

DockPanel不能实现这个效果：在下部两个TextBox之间加上一个可拖拽的分隔栏，要实现这个效果得使用Grid和GridSplitter

eg：使用Grid和GridSplitter实现可拖拽的分隔栏

~~~xaml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="25"></RowDefinition>
        <RowDefinition></RowDefinition>
    </Grid.RowDefinitions>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="150"></ColumnDefinition>
        <ColumnDefinition Width="auto"></ColumnDefinition>
        <ColumnDefinition></ColumnDefinition>
    </Grid.ColumnDefinitions>
    <TextBox Grid.ColumnSpan="3" BorderBrush="Black"></TextBox>
    <TextBox Grid.Row="1" Grid.Column="0" BorderBrush="Black"></TextBox>
    <GridSplitter Grid.Row="1" Grid.Column="1" 
                  VerticalAlignment="Stretch"
                  HorizontalAlignment="Center"
                  Width="2"
                  Background="Gray"
                  ShowsPreview="True"/>
    <TextBox Grid.Row="1" Grid.Column="2"></TextBox>
</Grid>
~~~

效果展示

<img src="G:\study\c# pic\QQ20250308-110423.png" alt="QQ20250308-110423" style="zoom:67%;" />

移动分割栏

<img src="G:\study\c# pic\QQ20250308-110515.png" alt="QQ20250308-110515" style="zoom:67%;" />

### WrapPanel布局

WrapPanel内部采用的是流式布局。WrapPanel使用Orientation属性来控制流延伸的方向，使用HorizontalAlignment和VerticalAlignment两个属性控制内部控件的对齐。在流延伸的方向上，WrapPanel会排列尽可能多的控件，排不下的控件将会新起一行或一列继续排列。

~~~xaml
<WrapPanel Orientation="Horizontal">
    <Button Content="114514" Width="50"></Button>
    <Button Content="114514" Width="50"></Button>
    <Button Content="114514" Width="50"></Button>
    <Button Content="114514" Width="50"></Button>
    <Button Content="114514" Width="50"></Button>
    <Button Content="114514" Width="50"></Button>
    <Button Content="114514" Width="50"></Button>
    <Button Content="114514" Width="50"></Button>
    <Button Content="114514" Width="50"></Button>
    <Button Content="114514" Width="50"></Button>
    <Button Content="114514" Width="50"></Button>
    <Button Content="114514" Width="50"></Button>
    <Button Content="114514" Width="50"></Button>
    <Button Content="114514" Width="50"></Button>
    <Button Content="114514" Width="50"></Button>
    <Button Content="114514" Width="50"></Button>
</WrapPanel>
~~~

效果

![QQ20250307-220720](G:\study\c# pic\QQ20250307-220720.png)

缩小后

![QQ20250307-220751](G:\study\c# pic\QQ20250307-220751.png)

## 数据绑定

程序的本质是数据加算法。数据会在存储、逻辑和展示三个层流通，所以站在数据的角度上来看，这三层都很重要。但算法在程序中的分布就不均匀了，对于一个三层结构的程序来说，算法一般分布在这几处：

-   A.数据库内部
-   B.读取和写回数据
-   C.业务逻辑
-   D.数据展示
-   E.界面与逻辑的交互

A、B两个部分的算法一般都非常稳定，不会轻易去改动，复用性也很高；C处与客户需求关系最紧密、最复杂，变动也最大，大多数算法都集中在这里；D、E两层负责UI与逻辑的交互，也占有一定量的算法。

显然，C部分是程序的核心、是开发的重中之重，**所以应该把精力集中在C部分**。

然而，D、E两个部分却经常成为麻烦的来源。首先，这两部分都与逻辑层紧密相关，一不小心就有可能把本来该放在逻辑层里的算法写进这两部分（所以才有了MVC、MVP等模式来避免这种情况出现)；其次，这两个部分以消息或事件的方式与逻辑层沟通，一旦出现同一个数据需要在多处展示和修改时，用于同步的代码就会错综复杂；最后，D和E本应是互逆的一对儿，但却需要分开来写一显示数据写一个算法、修改数据又是一个算法。总之导致的结果就是D和E两个部分会占去一部分算法，搞不好还会牵扯不少精力。

问题的根源就在于逻辑层与展示层的地位不固定一—当实现客户需求的时候，逻辑层的确处在 中心地位，但到了实现UI交互的时候展示层又处于中心地位。WPF作为一种专门的展示层技术， 华丽的外观和动画只是它的表层现象，更重要的是它在深层次上帮助程序员把思维的重心固定在了 逻辑层、让展示层永远处于逻辑层的从属地位。WPF具有这种能力的关键是它引入了`Data Binding` 概念以及与之配套的`DependencyProperty`系统和`DataTemplate`。

### Binding 基础

Binding 类似于数据的桥梁，其两端分别是源（Source）和目标（Target）。数据的来源处为源，数据的去向处为目标。通常 Binding 源是逻辑层的对象，Binding 目标是 UI 层的控件对象。这样，数据就会源源不断通过Binding送达UI层、被UI层展现，也就完成了数据驱动UI的过程。

而在Binding 这座桥上还可以架设一些“关卡”用来转换数据类型或者检验数据的正确性。	

eg：数据绑定的简单例子

首先创建一个Student类，作为数据源

~~~c#
 class Student
 {
     private string name;
     public string Name
     {
         get { return name; }
         set { name = value; }
     }
 }
~~~

对象通过属性向外暴露数据。在数据绑定中，UI 元素所关注的、想要通过 **Binding 获取值的属性被称为 Binding 的路径（Path）**，即确定要传递给 UI 元素的是数据源对象的哪个属性值。

-   **路径（Path）**：是指在数据绑定中，指定从数据源到目标 UI 元素要传递的具体属性。它就像是一个地址，告诉 Binding 应该获取数据源中的哪个属性值并传递给 UI 元素。例如在 Student 类中，如果 UI 元素只关心 Name 属性的值，那么 Name 就是 Binding 的路径，它指定了数据传递的具体内容，而不是属性的改变本身。

而想要一个属性具备通知Binding值已经变化的能力。则需要激发一个事件，在属性的set语句中激发一PropertyChanged

这个事件不需要自己声明，要做的是让作为**数据源的类**实现`System.ComponentModel`名称空间中`INotifyPropertyChanged`接口。当为Binding设置了数据源后，Binding就会**自动侦听**来自这个接口的`PropertyChanged`事件。

实现了接口的Student类

~~~C#
class Student : INotifyPropertyChanged
{
    private string name;
    public event PropertyChangedEventHandler PropertyChanged;
    public string Name
    {
        get { return name; }
        set
        {
            name = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs("Name"));
        }
    }
}
~~~

这样的话，当Name属性发生变化时PropertyChanged事件就会触发，Binding接收到这个事件后发现事件的消息告诉它是名为Name的属性发生了值的改变，于是就会通知Binding目标端的UI元素显示新的值。

然后进行数据绑定

~~~c#
public MainWindow()
{
    InitializeComponent();
    //数据源
    stu = new Student();

    // 准备绑定
    Binding binding = new Binding();
    binding.Source = stu;
    binding.Path = new PropertyPath("Name");

    // 使用绑定连接
    BindingOperations.SetBinding(this.textBoxName, TextBox.TextProperty, binding);

}
// btn click事件
private void Btn_Click(object sender, RoutedEventArgs e)
{
    stu.Name += "Name";
    Console.WriteLine(stu.Name);
}
~~~

 **`BindingOperations.SetBinding` 函数解释**

-   第一个参数用于指定`Binding`的目标，本例中是`this.textBoxName`
-   与数据源的`Path`原理类似，第二个参数用于为`Binding`指明把数据送达目标的哪个属性。只是你会发现在这里用的不是对象的属性而是类的一个静态只读（staticreadonly）的`DependencyProperty`类型成员变量！这是与Binding息息相关的依赖属性。其实很好理解，这类属性的值可以通过Binding依赖在其他对象的属性值上，被其他对象的属性值所驱动
-   第三个参数很明了，就是指定使用哪个`Binding`实例将数据源与目标关联起来

效果展示：

<img src="C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250310134227433.png" alt="image-20250310134227433" style="zoom:67%;" />

绑定关系图

![image-20250310140749689](C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250310140749689.png)

### Binding的数据与源

`Binding`的源也就是数据的源头。`Binding`的数据源只需要是一个对象并且通过属性（`Property`）公开自己的数据。

如果想要作为其源的对象具有自动通知`Binding`自己的属性值变化的能力，就需要实现`INotifyProprtyChanged`的接口并在属性的`set`语句中激发`PropertyChanged`事件。

接下来介绍介绍几种不同的数据源

#### 把控件作为Binding源与Binding标记扩展

大多数情况下Binding的源是逻辑层的对象，但有时候为了让UI元素产生一些联动效果也会使用Binding在控件间建立关联。

eg：把一个TextBox的Text属性关联在了Slider的Value属性上

~~~xaml
<StackPanel>
    <Slider x:Name="slider1" Maximum="114514" Minimum="0" Margin="5"></Slider>
    <TextBox x:Name="textBox1" Text="{Binding Path= Value, ElementName=slider1}"/>
</StackPanel>
~~~

这里使用了Bingding的标记扩展语法

~~~xaml
<TextBox x:Name="textBox1" Text="{Binding Path= Value, ElementName=slider1}"/>
~~~

与之等价的c#代码是

~~~c#
this.textBoxl.SetBinding(TextBox.TextProperty, new Binding("Value") (ElementName="sliderl" );
~~~

因为Binding类的构造器本身可以接收Path作为参数，所以也写为

~~~xaml
<TextBox x:Name="textBox1" Text="{Binding Value, ElementName=slider1}"/>
~~~

`ElementName`的值为`slider1`，表示绑定的数据源是名为`slider1`的元素。这里`TextBox`的`Text`属性（即绑定目标）将与`slider1`元素（绑定源）的`Value`属性进行绑定。当`slider1`的`Value`属性值发生变化时，`textBox1`的`Text`属性值也会自动更新；

扩展标记语法可以理解成：为 “为`Text`属性设置`Binding`为……”。

对上面的标记扩展语句，可以理解成将 `textBox1` 这个 `TextBox` 控件的 `Text` 属性与另一个名为 `slider1` 的控件的 `Value` 属性进行绑定。

#### 控制Binding的方向及数据更新

`Binding`在源与目标之间架起了沟通的桥梁，默认情况下数据既能够通过`Binding`送达目标，也能够从目标返回源（收集用户对数据的修改)。

有时候数据只需要展示给用户、不允许用户修改，这时候可以把`Binding`模式更改为从源向目标的单向沟通。

`Binding`还支持从目标向源的单向沟通以及只在`Binding`关系确立时读取一次数据。

而控制`Bingding`数据流向的属性是`Mode`，是`BingdingMode`枚举，可取值为`TowWay`，`OneWay`，`OnTime`，`OneWayToSource`和`Default`。

`Default`指的是会根据目标的实际情况来确定，比如若是可编辑的（如`TextBox.Text`属性)，`Default`就采用双向
模式；若是只读的（如TextBlock.Text)则采用单向模式。

上一个案例中的`Mode`默认就是`TowWay`，在下面输入特定的值，然后按Tab就能调整上面的条

<img src="C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250310152508120.png" alt="image-20250310152508120" style="zoom:67%;" />

因为Tab能让TextBox失去焦点，为什么失去焦点才更新，与Bingding的UpdateSourceTrigger属性有关，UpdateSourceTrigger类型是UpdateSourceTrigger枚举，可取值为PropertyChanged、LostFocus、Explicit和Default。而对于TextBox默认值Default的行为与LostFocus一致。更改其枚举为PropertyChanged，就能不失去焦点就更新了。

<img src="C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250310152203836.png" alt="image-20250310152203836" style="zoom:67%;" />

注：Binding还具有 NotifyOnSourceUpdated 和NotifyOnTargetUpdated 两个bool类型的属性。如果设为 true,则当源或目标被更新后Binding会激发相应的SourceUpdated事件和TargetUpdated事件。实际工作中，可以通过监听这两个事件来找出有哪些数据或控件被更新了。

#### Binding的路径（Path)

作为Binding源的对象可能有很多属性，通过这些属性Binding源可以把数据暴露给外界。可以通过Binding的Path属性来指定要暴露的属性。尽管在XAML代码中或者Binding类的构造器参数列表中以一个字符串来表示Path，但Path的实际类型**PropertyPath**。

上面的例子中的binding标记扩展对应的c#代码如下

~~~c#
Binding binding = new Binding(Path= new PropertyPath("Value"), Source = this.sliderl);
this.textBoxl.SetBinding(TextBox.TextProperty, binding);
~~~

Binding还支持多级路径（通俗地讲就是一路“点”下去）。比如，实现让一个TextBox显示另外一个TextBox的文本长度

~~~xaml
<StackPanel>
    <TextBox x:Name="textBox1" BorderBrush="Black" Margin="5"/>
    <TextBox x:Name="textBox2" Text="{ Binding Path=Text.Length,ElementName=textBox1,Mode=OneWay}"/>
</StackPanel>
~~~

对应的c#代码

~~~c#
this.textBox2.SetBinding(TextBox.TextProperty, new Binding("Text.Length"){Source =this.textBoxl,Mode=
BindingMode.OneWay});
~~~

<img src="C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250310161317864.png" alt="image-20250310161317864" style="zoom:67%;" />

集合类型的索引器（Indexer)又称为带参属性，属于属性也可以作为Path使用。

eg：让一个TextBox显示另一个TextBox文本的第五个字符

~~~xaml
<StackPanel>
    <TextBox x:Name="textBox1" BorderBrush="Black" Margin="5"></TextBox>
    <TextBox x:Name="textBox2" Text="{ Binding Path=Text[4],ElementName=textBox1,Mode=OneWay}"/>
</StackPanel>
~~~

对应的c#代码

~~~c#
    this.textBox2.SetBinding(TextBox.TextProperty,newBinding("Text[3]")(Source=this.textBoxl,ModeBindingMode.One Way );
~~~

#### 没有Path的Binding

在代码中有时会遇到 Path 为 “.” 或无 Path 的 Binding 情况。这是因为当 Binding 源本身就是数据，且无需 Path 指明（如 string、int 等基本类型，其实例本身即为数据，无特定属性来访问该数据）时，可将 Path 值设为 “.” 。
在 XAML 代码中，Path 为 “.” 时可省略不写；但在 C# 代码里，Path 为 “.” 时不能省略，必须明确写出。

eg：

~~~xaml
<StackPanel>
    <StackPanel.Resources>
        <sys1:String x:Key="myString">
                  114514
        </sys1:String>
    </StackPanel.Resources>
    <TextBlock x:Name="textBlock1" TextWrapping="Wrap"
               Text="{Binding Path=.,Source={StaticResource ResourceKey=myString}}"></TextBlock>
</StackPanel>
~~~

#### Binding指定源（Source）的方法

Binding的源是数据的来源，所以，只要一个对象包含数据并能通过属性把数据暴露出来，它就能当作Binding的源来使用。包含数据的对象比比皆是，但必须为Binding的Source指定合适的对象Binding才能正确工作。

常见的办法有：

**把普通CLR类型单个对象指定为Source**:包括.NETFramework自带类型的对象和用户自定义类型的对象。如果类型实现了**INotifyPropertyChanged**接口，则可通过在属性的set语句里激发PropertyChanged事件来通知Binding数据已被更新。

**把普通CLR集合类型对象指定为Source**：包括数组、List< T >、ObservableCollection< T >等集合类型。实际工作中，经常需要把一个集合作为ItemsControl派生类的数据源来使用，一般是把控件的ItemsSource属性使用Binding关联到一个集合对象上。把ADO.NET数据对象指定为Source:包括DataTable和DataView等对象。

**使用XmlDataProvider把XML数据指定为Source**：XML作为标准的数据存储和传输格式几乎无处不在，可以用它表示单个数据对象或者集合；一些WPF控件是**级联式**（树形结构）的(如TreeView和Menu)，可以把树状结构的XML数据作为源指定给与之关联的Binding.

**把依赖对象（DependencyObject)指定为Source**：依赖对象不仅可以作为Binding的目标，同时也可以作为Binding的源。这样就有可能形成Binding链。依赖对象中的依赖属性可以作为Binding的Path。

**把容器的DataContext指定为Source**（WPFDataBinding的默认行为):有时候会遇到这样的情况——明确知道将从哪个属性获取数据，但具体把哪个对象作为Binding源还不能确定。这时候，只能先建立一个Binding、只给它设置Path而不设置Source，让这个Binding自己去寻找Source。这时候，Binding会自动把控件的DataContext当作自己的Source(它会沿着控件树一层一层向外找，直到找到带有Path指定属性的对象为止)。

**通过ElementName指定Source**:在C#代码里可以直接把对象作为Source赋值给Binding，但XAML无法访问对象，所以只能使用对象的Name属性来找到对象。

**通过Binding的RelativeSource属性相对地指定Source**：当控件需要关注自**己的、自己容器的或者自己内部元素**的某个值就需要使用这种办法。

**把ObjectDataProvider对象指定为Source**：当数据源的数据不是通过属性而是通过方法暴露给外界的时候，我们可以使用这两种对象来包装数据源再把它们指定为Source。

**把使用LINQ检索得到的数据对象作为Binding的源**

### 使用 DataContext作为Binding的源

DataContext属性被定义在FrameworkElement类里，这个类是WPF控件的基类，**这意味着所有WPF控件（包括容器控件)都具备这个属性**。如前所述，WPF的UI布局是树形结构，这棵树的每个结点都是控件，由此推出另一个结论：在UI元素树的**每个结点都有DataContext**。这一点非常重要，因为当一个Binding只知道自己的Path而不知道自己的Soruce时，它会沿着UI元素树一路向树的根部找过去，每路过一个结点就要看看这个结点的DataContext是否具有Path所指定的属性。如果有，那就把这个对象作为自己的Source；如果没有，那就继续找下去；如果到了树的根部还没有找到，那这个Binding就没有Source，因而也不会得到数据。

eg DataContext 示例：

~~~XAML
<StackPanel Background="LightBlue">
    <StackPanel.DataContext>
        <studnt:Student
            Name="Tom"
            Age="29"
            StudentId="6" />
    </StackPanel.DataContext>
    <Grid>
        <StackPanel>
            <TextBlock Text="{Binding Path=StudentId}" />
            <TextBlock Text="{Binding Path=Name}" />
            <TextBlock Text="{Binding Path=Age}" />
        </StackPanel>
    </Grid>
</StackPanel>
~~~

它会顺着可视化树一层层访问DataContext属性，如果有绑定的属性则使用找到的属性

~~~mermaid
%%{init: {'theme':'dark'}}%%
flowchart
	a[Window]
	b[StackPanel]
	c[Grid]
	d[StackPanel]
	e[TextBox]
	f[TextBox]
	g[TextBox]
	h[DataBase]
	a-->b
	b-->c
	c-->d
	d-->e
	d-->f
	d-->g
	b-.have.->h
~~~

可视化树，顺着树找，发现在第二个StackPanel发现了DataBase，并有要绑定的Path。

#### 实现原理

“Binding沿着UI元素树向上找”只是WPF给我们的一个错觉，Binding并没有那么智能。之所以会有这种效果是因为DataContext是一个“依赖属性”（后面章节会详细讲述)，依赖属性有一个很重要的特点就是当你没有为控件的某个依赖属性显式赋值时，控件会把自已容器的属性值“借过来”当作自己的属性值。**实际上是属性值沿着UI元素树向下传递了**。

eg：

程序的UI部分是若干层Grid，最内层Grid里放置了一个Button，为最外层的Grid设置了DataContext属性值，因为内层的Grid和Button都没有设置DataContext属性值所以最外层Grid的DataContext属性值会一直传递到Button那里，单击Button就会显示这个值。

~~~xaml
<Grid DataContext="114514">
    <Grid>
        <Grid>
            <Grid>
                <Button x:Name="testBtn" Content="click me" Click="testBtn_click"></Button>
            </Grid>
        </Grid>
    </Grid>
</Grid>
~~~

展示（属性值沿着UI元素树向下传递）

<img src="C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250314171607352.png" alt="image-20250314171607352" style="zoom:67%;" />

#### 使用场景：

-   当UI上的**多个控件**都使用Binding关注同一个对象时，不妨使用DataContext。
-   当作为Source的对象不能被直接访问的时候。比如B窗体内的控件想把A窗体内的控件当作自己的Binding源时，但A窗体内的控件是private访问级别，这时候就可以把这个控件（或者控件的值）作为窗体A的DataContext（这个属性是public访问级别的）从而暴露数据。

外层容器的DataContext就相当于一个数据的“制高点”（水往低处流），只要把数据放上去，别的元素就都能看见。另外，DataContext本身也是一个依赖属性，可以使用Binding把它关联到一个数据源上。

### 使用集合对象作为列表控件的ItemsSource

WPF中的列表式控件们派生自ItemsControl类，继承了ItemsSource这个属性。

**ItemsSource**属性可以接收一个**IEnumerable**接口派生类的实例作为自己的值（所有可被迭代遍历的集合都实现了这个接口，包括数组、List< T >等)。每个ItemsControl的派生类都具有自己对应的条目容器(ItemContainer)

例如，ListBox的条目容器是ListBoxItem、ComboBox的条目容器是ComboBoxItem。

ItemsSource里存放的是一条一条的数据，要想把数据显示出来需要为它们穿上“外衣”（类似一个盒子里面装了数据），条目容器就起到数据外衣的作用。然后依靠**Binding**让每件数据外衣与它对应的数据条目关联起来。

只要为一个ItemsControl对象设置了ItemsSource属性值，ItemsControl对象就会**自动迭代**其中的数据元素、为每个数据元素准备一个条目容器，并使用Binding在条目容器与数据元素之间建立起关联。

实例 把一个List< Student >集合的实例作为ListBox的ItemsSource：

ui界面代码

~~~xaml
 <StackPanel x:Name="stackPanel" Background="LightBlue">
     <TextBlock
         Margin="5"
         FontWeight="Bold"
         Text="Student ID" />
     <TextBox x:Name="textBold" Margin="5" />
     <TextBlock
         Margin="5"
         FontWeight="Bold"
         Text="Student List" />
     <ListBox
         x:Name="listBoxStudents"
         Height="110"
         Margin="5" />
 </StackPanel>
~~~

绑定

~~~c#
 List<Student> list = new List<Student>() {
    new Student(){StudentId=114514,Name="Tom1",Age=10},
    new Student(){StudentId=114515,Name="Tom2",Age=11},
    new Student(){StudentId=114516,Name="Tom3",Age=12},
    new Student(){StudentId=114517,Name="Tom4",Age=13},
 };
 // list设置绑定
 this.listBoxStudents.ItemsSource = list;
 this.listBoxStudents.DisplayMemberPath = "Name";

 // 为TextBox 设置Binding
 Binding binding = new Binding("SelectedItem.StudentId") { Source = this.listBoxStudents };
 this.textBold.SetBinding(TextBox.TextProperty, binding);
~~~

但是对于这段代码

~~~c#
// list设置绑定
 this.listBoxStudents.ItemsSource = list;
 this.listBoxStudents.DisplayMemberPath = "Name";
~~~

好像没有出现Binding。实际上，“this.listBoxStudents.DisplayMemberPath="Name";”这句代码还是露出了一些蛛丝马迹。注意到其包含“Path”，这说明它是一个路径。当DisplayMemberPath属性被赋值后，ListBox在获得ItemsSource的时候就会创建等量的ListBoxItem并以DisplayMemberPath属性值为Path创建Binding，Binding的目标是ListBoxItem（条目容器）。这里是TextBox

 效果展示：

 <img src="C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250314195521185.png"
        alt="image-20250314195521185" style="zoom:67%;">



在此基础上实现自定义显示

ui界面

~~~xaml
 <StackPanel x:Name="stackPanel" Background="LightBlue">
     <TextBlock
         Margin="5"
         FontWeight="Bold"
         Text="Student ID" />
     <TextBox x:Name="textBold" Margin="5" />
     <TextBlock
         Margin="5"
         FontWeight="Bold"
         Text="Student List" />
     <ListBox
         x:Name="listBoxStudents"
         Height="110"
         Margin="5">
         <ListBox.ItemTemplate>
             <DataTemplate>
                 <StackPanel>
                     <StackPanel Orientation="Horizontal">
                         <TextBlock
                             Width="60"
                             FontSize="15"
                             Text="{Binding Path=StudentId}" />
                         <TextBlock
                             Width="40"
                             FontSize="15"
                             Text="{Binding Path=Name}" />
                         <TextBlock
                             Width="30"
                             Margin="10,0,0,0"
                             FontSize="15"
                             Text="{Binding Path=Age}" />
                     </StackPanel>
                 </StackPanel>
             </DataTemplate>
         </ListBox.ItemTemplate>
     </ListBox>
 </StackPanel>
~~~

相关绑定

~~~c#
 List<Student> list = new List<Student>() {
    new Student(){StudentId=114514,Name="Tom1",Age=10},
    new Student(){StudentId=114515,Name="Tom2",Age=11},
    new Student(){StudentId=114516,Name="Tom3",Age=12},
    new Student(){StudentId=114517,Name="Tom4",Age=13},
 };
 // list设置绑定
 this.listBoxStudents.ItemsSource = list;

 // 为TextBox 设置Binding
 Binding binding = new Binding("SelectedItem.StudentId") { Source = this.listBoxStudents };
 this.textBold.SetBinding(TextBox.TextProperty, binding)
~~~

注：在使用集合类型作为列表控件的ItemsSource时一般会考虑使用ObservableCollection< T >代替List< T >，因为ObservableCollection< T >类实现了INotifyCollectionChanged和INotifyPropertyChanged接口，能把集合的变化立刻通知显示它的列表控件，改变会立刻显现出来。


### 使用LINQ检索结果作为Binding的源

LINQ查询的结果是一个IEnumerable< T >类型对象，而IEnumerable< T >又派生自IEnumerable，所以它可以作为列表控件的ItemsSource来使用。

eg 使用linq查询集合对象，并作为源：

ui界面

~~~xaml
<StackPanel x:Name="stackPanel" Background="LightBlue">
    <ListView
        x:Name="listViewStudents"
        Height="143"
        Margin="5">
        <ListView.View>
            <GridView>
                <GridViewColumn
                    Width="60"
                    DisplayMemberBinding="{Binding Path=StudentId}"
                    Header="id" />
                <GridViewColumn
                    Width="60"
                    DisplayMemberBinding="{Binding Path=Name}"
                    Header="name" />
                <GridViewColumn
                    Width="60"
                    DisplayMemberBinding="{Binding Path=Age}"
                    Header="age" />
            </GridView>
        </ListView.View>
    </ListView>
</StackPanel>
~~~

绑定

~~~c#
 List<Student> stuList = new List<Student>() {
    new Student(){StudentId=114514,Name="Tom1",Age=10},
    new Student(){StudentId=114515,Name="Tom2",Age=11},
    new Student(){StudentId=114516,Name="Tom3",Age=12},
    new Student(){StudentId=114517,Name="Tom4",Age=13},
 };

 this.listViewStudents.ItemsSource = from stu in stuList
                                     where stu.Age > 10
                                     select stu;
~~~

查询年龄大于10的学生信息，效果展示：

![](C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250314203226641.png)

### 使用ObjectDataProvider对象作为Binding的Source

理想的情况下，上游程序员把类设计好、使用属性把数据暴露出来，下游程序员把这些类的实例作为Binding的Source、把属性作为Binding的Path来消费这些类。

但很难保证一个类的所有数据都使用属性暴露出来，比如**需要的数据可能是方法的返回值**。而重新设计底层类的风险和成本会比较高，况且黑盒引用类库的情况下也不可能更改已经编译好的类，这时候就需要使用ObjectDataProvider来包装作为Binding源的数据对象了。

#### 为什么要使用

##### 1. 数据绑定机制不支持直接绑定方法

WPF 的数据绑定机制主要是针对属性进行设计的。当使用绑定表达式（如 `{Binding Path=SomeProperty}`）时，它期望的是一个可被访问的属性。方法不能直接作为 `Binding` 的 `Path`，因为绑定引擎需要一个可观察的、稳定的数据源，属性能够满足这一需求，而方法在绑定语法层面不被直接支持。

```xml
<ListBox ItemsSource="{Binding Path=GetData()}"/>
```

##### 2. 无法自动更新数据

在 WPF 中，数据绑定的一个重要特性是数据的自动更新，即当数据源发生变化时，界面上绑定的元素能够自动更新显示。属性可以通过实现 `INotifyPropertyChanged` 接口来通知绑定引擎数据的变化。而方法在调用后返回一个固定的值，它本身没有内置的机制来通知界面数据发生了改变。

假设 `GetData` 方法在某些情况下会返回不同的结果，但由于它不是属性，绑定引擎无法感知到这些变化，也就不能自动更新界面显示。

##### 3. 难以控制方法调用的时机

直接调用方法时，难以精确控制方法调用的时机。在数据绑定场景下，通常希望在合适的时机（如界面加载、数据上下文改变等）调用方法获取数据。如果直接调用方法，可能会导致在不合适的时间调用，或者多次不必要的调用，影响性能。

eg 简单计算器实例：

ui界面

~~~xaml
 <StackPanel
     x:Name="stackPanel"
     Background="LightBlue"
     Orientation="Vertical">
     <TextBox x:Name="arg1" />
     <TextBox x:Name="arg2" />
     <TextBox x:Name="ans" />
 </StackPanel>
~~~

绑定代码

~~~c#
private void SetBinding()
{
    // 创建一个 ObjectDataProvider 实例，用于包装要调用的方法和提供数据绑定的数据源
    ObjectDataProvider odp = new ObjectDataProvider();
    // 设置 ObjectDataProvider 的实例为 Caculator 类的一个新对象，表明要调用该类的方法
    odp.ObjectInstance = new Caculator();
    // 指定要调用的方法名为 Add，即当进行数据绑定时会调用 Caculator 类的 Add 方法
    odp.MethodName = "Add";
    // 为 Add 方法添加第一个参数，初始值设置为字符串 "0"
    odp.MethodParameters.Add("0");
    // 为 Add 方法添加第二个参数，初始值设置为字符串 "0"
    odp.MethodParameters.Add("0");

    // 创建一个 Binding 对象，用于将 arg1 文本框的 Text 属性绑定到 ObjectDataProvider 的第一个方法参数上
    Binding bindingToArg1 = new Binding("MethodParameters[0]")
    {
        // 设置绑定的源为 ObjectDataProvider 实例，即数据将从这个对象获取
        Source = odp,
        // 设置绑定直接作用于源对象，跳过数据上下文查找，提高绑定效率
        BindsDirectlyToSource = true,
        // 设置更新源的触发条件为属性值改变时立即更新，即当 arg1 文本框的文本发生变化时，立即更新绑定源
        UpdateSourceTrigger = UpdateSourceTrigger.PropertyChanged
    };

    // 创建一个 Binding 对象，用于将 arg2 文本框的 Text 属性绑定到 ObjectDataProvider 的第二个方法参数上
    Binding bindingToArg2 = new Binding("MethodParameters[1]")
    {
        // 设置绑定的源为 ObjectDataProvider 实例
        Source = odp,
        // 设置绑定直接作用于源对象
        BindsDirectlyToSource = true,
        // 设置更新源的触发条件为属性值改变时立即更新，即当 arg2 文本框的文本发生变化时，立即更新绑定源
        UpdateSourceTrigger = UpdateSourceTrigger.PropertyChanged
    };

    // 创建一个 Binding 对象，用于将 ans 文本框的 Text 属性绑定到 ObjectDataProvider 本身
    // 由于绑定路径为 "."，表示直接绑定到数据源对象，即获取 ObjectDataProvider 调用方法后的返回值
    Binding bindingToAns = new Binding(".")
    {
        // 设置绑定的源为 ObjectDataProvider 实例
        Source = odp
    };

    // 将 arg1 文本框的 Text 属性与之前创建的 bindingToArg1 绑定，实现数据的双向同步
    this.arg1.SetBinding(TextBox.TextProperty, bindingToArg1);
    // 将 arg2 文本框的 Text 属性与之前创建的 bindingToArg2 绑定，实现数据的双向同步
    this.arg2.SetBinding(TextBox.TextProperty, bindingToArg2);
    // 将 ans 文本框的 Text 属性与之前创建的 bindingToAns 绑定，实现数据的单向同步，显示计算结果
    this.ans.SetBinding(TextBox.TextProperty, bindingToAns);
}
~~~

界面

![image-20250314224824005](C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250314224824005.png)

在上面的TextBox输入值时，会自动调用计算方法

### 使用Binding的RelativeSource

当一个Binding有明确的数据来源时可以通过为Source或ElementName赋值的办法让Bindng与之关联。有些时候不能确定作为Source的对象叫什么名字，但知道它与作为Binding目标的对象在UI布局上有相对关系，比如控件自己关联自己的某个数据、关联自己某级容器的数据。这时候就要使用Binding的RelativeSource属性。RelativeSource属性的数据类型为RelativeSource类，通过这个类的几个静态或非静态属性可以控制它搜索相对数据源的方式。（从本身出发查找）

eg 获取其父元素的Name：

~~~xaml
<Grid
    x:Name="g1"
    Margin="10"
    Background= "Red">
    <DockPanel
        x:Name="d1"
        Margin="10"
        Background="Orange">
        <Grid
            x:Name="g2"
            Margin="10"
            Background="Yellow">
            <DockPanel
                x:Name="d2"
                Margin="10"
                Background="LawnGreen">
                <TextBox
                    x:Name="textBox1"
                    Margin="10"
                    FontSize="24" />
            </DockPanel>
        </Grid>
    </DockPanel>
</Grid>
~~~

绑定代码

~~~c#
// 创建一个 RelativeSource 对象，指定查找模式为查找祖先元素
RelativeSource rs = new RelativeSource(RelativeSourceMode.FindAncestor);

// 设置要查找的祖先元素的层级，这里设置为 1 表示从父元素开始，一层一层向外找
// 如果设置为 2 则查找父元素的父元素，依此类推
rs.AncestorLevel = 1;

// 设置要查找的祖先元素的类型，这里指定为 DockPanel 类型
// 即要查找的祖先元素必须是 DockPanel 类型或其子类
rs.AncestorType = typeof(DockPanel);

// 创建一个 Binding 对象，指定绑定的属性路径为 "Name"
// 也就是要绑定到找到的祖先元素的 Name 属性
// 同时将之前创建的 RelativeSource 对象赋值给 Binding 的 RelativeSource 属性
Binding binding = new Binding("Name") { RelativeSource = rs };

// 将 Binding 对象应用到 textBox1 控件的 Text 属性上
// 这样 textBox1 的 Text 属性就会绑定到其直接父 DockPanel 元素的 Name 属性
// 当 DockPanel 的 Name 属性值发生变化时，textBox1 的文本内容也会相应更新
this.textBox1.SetBinding(TextBox.TextProperty, binding);
~~~

直接在xaml指定绑定

~~~xaml
<Grid
    x:Name="g1"
    Margin="10"
    Background="Red">
    <DockPanel
        x:Name="d1"
        Margin="10"
        Background="Orange">
        <Grid
            x:Name="g2"
            Margin="10"
            Background="Yellow">
            <DockPanel
                x:Name="d2"
                Margin="10"
                Background="LawnGreen">
                <TextBox
                    x:Name="textBox1"
                    Margin="10"
                    FontSize="24"
                    Text="{Binding RelativeSource={RelativeSource Mode=FindAncestor, AncestorLevel=1, AncestorType={x:Type Grid}}, Path=Name}" />
            </DockPanel>
        </Grid>
    </DockPanel>
</Grid>
~~~

展示结果

<img src="C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250315103431007.png" alt="image-20250315103431007" style="zoom:67%;" />

RelativeSource类的Mode属性的类型是RelativeSourceMode枚举，它的取值有:**PreviousData**、**TemplatedParent**、**Self**和**FindAncestor**。RelativeSource类还有 3个静态属性:PreviousData、Self和TemplatedParent，他们的类型是RelativeSource类。实际上这3个静态属性就是创建一个RelativeSource实例、把实例的Mode属性设置为相应的值，然后返回这个实例。

### Binding对数据的转换与校验

Binding的作用就是架在Source与Target之间的桥梁，数据可以在这座桥梁的帮助下来流通。就像现实世界中的桥梁会设置一些关卡进行安检一样，Binding这座桥上也可以设置关卡对数据的有效性进行检验，不仅如此，当Binding两端要求使用不同的数据类型时，还可以为数据设置转换器用于数据的转换。

#### 数据校验

Binding用于数据有效性校验的关卡是它的ValidationRules属性。

Binding的ValidationRules属性类型是Collection< ValidationRule >，从它的名称和数据类型可以得知可以为每个Binding设置多个数据校验条件，每个条件是一个ValidationRule类型对象。ValidationRule类是个抽象类，在使用的时候我们需要创建它的派生类并实现它的Validate方法。Validate方法的返回值是ValidationResult类型对象，如果校验通过，就把ValidationResult对象的IsValid属性设为true，反之，需要把IsValid属性设为false并为其ErrorContent属性设置一个合适的消息内容（一般是个字符串）。

在 WPF 数据绑定中：

**默认行为**
✅ **Target→Source 方向**（用户输入）：

-   会自动校验（防止脏数据污染 Source）
-   例如：用户在 TextBox 输入非法内容时，Binding 会阻止该值写入 ViewModel

❌ **Source→Target 方向**（程序更新）：

-   **不校验**（假设 Source 数据可信）
-   例如：通过代码修改 ViewModel 属性时，直接更新 UI 控件，不检查数据有效性

如果想改变这种行为，或者说当来自Source的数据也有可能出问题时，就需要将校验条件的ValidatesOnTargetUpdated属性设为true。

eg 简单绑定实例：

ui界面

~~~xaml
<StackPanel>
    <TextBox x:Name="textBox1" Margin="5" />
    <Slider
        x:Name="slider1"
        Margin="5"
        Maximum="100"
        Minimum="0" />
</StackPanel>
~~~

后台绑定

~~~c#
// 创建一个新的 Binding 对象，绑定到名为 "Value" 的属性
// 这里的 Source 设置为 slider1 控件，意味着 Binding 会从 slider1 控件获取 "Value" 属性的值
Binding binding = new Binding("Value")
{
    Source = this.slider1
};

// 设置 Binding 的 UpdateSourceTrigger 属性为 PropertyChanged
// 这意味着每当目标（这里是 slider1 的 Value 属性）的值发生变化时，就会立即更新绑定源
binding.UpdateSourceTrigger = UpdateSourceTrigger.PropertyChanged;

// 创建一个自定义的验证规则对象 RangeValidationRuler
// 该规则用于验证输入的值是否在指定范围内
RangeValidationRuler rangeValidationRuler = new RangeValidationRuler();

// 设置验证规则的 ValidatesOnTargetUpdated 属性为 true
// 这表示当目标值（例如从 Source 更新到 Target 时）发生变化时，也会触发验证规则
rangeValidationRuler.ValidatesOnTargetUpdated = true;

// 将自定义的验证规则添加到 Binding 的 ValidationRules 集合中
// 这样在进行数据绑定时，就会应用该验证规则对数据进行验证
binding.ValidationRules.Add(rangeValidationRuler);

// 将创建好的 Binding 应用到 textBox1 的 TextProperty 上
// 这意味着 textBox1 的文本内容会根据 slider1 的 Value 属性进行更新，并且会进行验证
this.textBox1.SetBinding(TextBox.TextProperty, binding);

// 自定义的验证规则类，继承自 ValidationRule
// 用于验证输入的值是否在 0 到 100 的范围内
public class RangeValidationRuler : ValidationRule
{
    // 重写 Validate 方法，该方法会在验证时被调用
    // value 是需要验证的值，cultureInfo 是当前的文化信息
    public override ValidationResult Validate(object value, CultureInfo cultureInfo)
    {
        // 定义一个 double 类型的变量 d，用于存储转换后的值
        double d = 0;
        // 尝试将输入的值转换为 double 类型
        if (double.TryParse(value.ToString(), out d))
        {
            // 如果转换成功，检查转换后的值是否在 0 到 100 的范围内
            if (d >= 0 && d <= 100)
            {
                // 如果在范围内，返回一个验证成功的结果
                return new ValidationResult(true, null);
            }
        }
        // 如果转换失败或者值不在范围内，返回一个验证失败的结果，并附带错误信息
        return new ValidationResult(false, "Validation Failed");
    }
}
~~~

这段代码的主要功能是将 `slider1` 控件的 `Value` 属性绑定到 `textBox1` 的 `Text` 属性上，并且在数据更新时应用自定义的验证规则，确保输入的值在 0 到 100 的范围内。同时，设置了验证规则在目标值更新时也会触发验证。

效果展示

![image-20250315165839323](C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250315165839323.png)

#### 路由事件

当校验错误的时候Validate方法返回的ValidationResult对象携带着一条错误消息，要显示这条信息就需要用到路由事件（RoutedEvent)。

首先，在创建Binding时要把Binding对象的NotifyOnValidationError属性设为 true，这样，当数据校验失败的时候Binding会像报警器一样发出一个信号，这个信号会以Binding对象的Target为起点在UI元素树上传播。信号每到达一个结点，如果这个结点上设置有对这种信号的侦听器（**事件处理器**)，那么这个侦听器就会被触发用以处理这个信号。信号处理完后，程序员还可以选择是让信号继续向下传播还是就此终止——这就是路由事件，信号在UI元素树上的传递过程就称为路由 (Route)。

eg 上面代码添加路由事件，当target输入的值不符合要求时，弹出提示：

~~~c#
private void SetBinding()
{
    ......
        
    // 设置绑定的 NotifyOnValidationError 属性为 true
    // 当验证失败时，会触发 Validation.Error 事件
    binding.NotifyOnValidationError = true;
    
    ......
        
    // 为 textBox1 添加 Validation.Error 事件的处理程序
    // 当验证失败触发该事件时，会调用 ValidationError 方法进行处理
    this.textBox1.AddHandler(Validation.ErrorEvent, new RoutedEventHandler(this.ValidationError));
}

// 验证错误事件的处理方法，当 Validation.Error 事件触发时会执行此方法
private void ValidationError(object sender, RoutedEventArgs e)
{
    // 检查 textBox1 是否存在验证错误
    // 通过 Validation.GetErrors 方法获取 textBox1 的验证错误集合，并检查其数量是否大于 0
    if (Validation.GetErrors(this.textBox1).Count > 0)
    {
        // 如果存在验证错误，将第一个错误的错误信息内容转换为字符串
        // 并将其设置为 textBox1 的 ToolTip，以便用户悬停时可以看到错误提示
        this.textBox1.ToolTip = Validation.GetErrors(this.textBox1)[0].ErrorContent.ToString();
    }
}
~~~



#### 数据转换

用于数据类型转换的关卡是它的Converter属性。

在之前的示例里，借助 Binding 把 Slider 控件（Source，Value 属性为 double 类型）和 TextBox 控件（Target，Text 属性为 string 类型）关联起来，虽二者数据类型不同，但数据能正常流转。

这得益于 Binding 的数据转换（Data Convert）机制。当 Source 端和 Target 端的数据类型不一致时，可添加数据转换器（DataConverter）。

像 double 与 string 类型的转换较简单，WPF 类库会自动处理；然而，有些类型之间的转换 WPF 无法自动完成。需要自行编写转换方法（Converter）。

需要创建一个类并实现IValueConverter接口

接口定义

~~~c#
// 提供一种对绑定应用自定义逻辑的方式。
public interface IValueConverter
{
    //
    // 摘要:
    //     转换一个值。
    // 返回结果:
    //     一个转换后的值。如果该方法返回 null，则使用有效的 null 值。
    object Convert(object value, Type targetType, object parameter, CultureInfo culture);
    //
    // 摘要:
    //     反向转换一个值。
    // 返回结果:
    //     一个转换后的值。如果该方法返回 null，则使用有效的 null 值。
    object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture);
}
// 有效的 null 值: 支持空值就返回空值，不支持则返回数据类型的默认值
~~~

1.  **方法调用时机**：数据从 `Binding` 的 `Source` 流向 `Target` 时调用 `Convert` 方法；数据从 `Target` 流向 `Source` 时调用 `ConvertBack` 方法。
2.  **参数特点**：两个方法参数列表相同。第一个参数为 `object` 类型，保证了 `Converter` 的重用性；第二个参数用于确定返回类型；第三个参数可传入额外信息，多个信息可放在集合对象中传入。
3.  **`Mode` 属性影响**：`Binding` 对象的 `Mode` 属性决定方法调用情况。`Mode` 为 `TwoWay` 或默认行为与 `TwoWay` 一致时，两个方法都可能被调用；`Mode` 为 `OneWay` 或默认行为与 `OneWay` 一致时，仅调用 `Convert` 方法，其它`Mode`类似。

eg converter实例：

~~~xaml
<Window.Resources>
    <entity:CategoryToSourceConverter x:Key="cts" />
    <entity:StateToNullableBoolConverter x:Key="stnb" />
</Window.Resources>
<StackPanel Background="LightBlue">
    <ListBox
        x:Name="listBoxPlane"
        Height="160"
        Margin="5">
        <ListBox.ItemTemplate>
            <DataTemplate>
                <StackPanel Orientation="Horizontal">
                    <Image
                        Width="20"
                        Height="20"
                        Source="{Binding Path=Category, Converter={StaticResource cts}}" />
                    <TextBlock
                        Width="60"
                        Margin="80,0"
                        Text="{Binding Path=Name}" />
                    <CheckBox IsChecked="{Binding Path=State, Converter={StaticResource stnb}}" IsThreeState="True" />
                </StackPanel>
            </DataTemplate>
        </ListBox.ItemTemplate>
    </ListBox>
    <Button
        x:Name="btnLoad"
        Height="25"
        Margin="5,0"
        Click="btnLoad_Click"
        Content="Load" />
    <Button
        x:Name="btnSave"
        Height="25"
        Margin="5,5"
        Click="btnSave_Click"
        Content="Save" />
</StackPanel>
~~~



## 依赖属性

在WPF中，微软将属性这个概念又向前推进了一步，推出了“依赖属性”这个新概念。简言之，依赖属性就是一种可以**自己没有值**，并能通过使用**Binding**从数据源获得值（依赖在别人身上)的属性。拥有依赖属性的对象被称为“依赖对象”。与传统的CLR属性和面向对象思想相比依赖属性有很多新颖之处，其中包括：

-   节省实例对内存的开销。
-   属性值可以通过Binding依赖在其他对象上。

### 依赖属性对内存的使用

传统的.NET开发中，一个对象所占用的内存空间在调用 new 操作符进行实例化的时候就已经决定了，而**WPF允许对象在被创建的时候并不包含用于存储数据的空间**（即字段所占用的空间）、只保留在需要用到数据时能够获得默认值、借用其它对象数据或实时分配空间的能力，这种对象就称为依赖对象（DependencyObject)而它这种实时获取数据的能力则依靠依赖属性（DependencyProperty）来实现。WPF开发中，必须使用依赖对象作为依赖属性的宿主，使二者结合起来，才能形成完整的Binding目标被数据所驱动。

在WPF系统中，依赖对象的概念被DependencyObject类所实现，依赖属性的概念则由DependencyProperty类所实现。DependencyObject 具有 GetValue 和 SetValue两个方法：

~~~c#
 public class DependencyObject : DispatcherObject
 {
      public object GetValue(DependencyProperty dp)
      {
      		//    
      }
     public void SetValue(DependencyProperty dp, object value)
     {
         	//
     }
 }
~~~

这两个方法都以DependencyProperty对象为参数，GetValue方法通过DependencyProperty对象获取数据；SetValue通过DependencyProperty对象存储值，正是这两个方法把DependencyObject和DependencyProperty紧密结合在一起。

WPF的所有UI控件都是依赖对象，充分利用了依赖属性的优势

### 依赖属性的声明与使用

DependencyProperty必须以DependencyObject为宿主、借助它的SetValue和GetValue方法进行写入与读取。因此，想使用自定义的DependencyProperty，**宿主一定是DependencyObject的派生类**。

DependencyProperty实例的声明特点很鲜明，引用变量由**public static readonly**三个修饰符修饰，实例并非使用new操作符得到而是使DependencyProperty.Register方法生成。

~~~c#
// 派生自 DependencyObject
public class DependencyStudent : DependencyObject
{
    // 使用DependencyProperty声明的成员变量同时被public static readonly三个修饰符修饰
    // 命名约定成员变量的名字需要加上Property后缀以表明它是一个依赖属性
    public static readonly DependencyProperty NameProrperty =
        DependencyProperty.Register("Name", typeof(string), typeof(DependencyStudent));
} 
~~~

对于函数 DependencyProperty.Register ：

-   第1个参数为string类型，**用这个参数来指明以哪个CLR属性作为这个依赖属性的包装器，或者说此依赖属性支持（back）的是哪个CLR属性**
-   第2个参数用来**指明此依赖属性用来存储什么类型的值**，学生的姓名是string类型，所以是这个参数被赋值typeof(string)
-   第3个参数用来**指明此依赖属性的宿主是什么类型，或者说DependencyProperty.Register方法将把这个依赖属性注册关联到哪个类型上**。上面代码的意图是为Student类准备一个可依赖的名称属性，所以需要把NameProperty注册成与Student关联，因此这个参数被赋值为typeof(DependencyStudent)
-   还有第四个参数PropertyMetadata，用于依赖属性的DefaultMetadata属性赋值。**DefaultMetadata的作用是向依赖属性的调用者提供一些基本信息**
    -   CoerceValueCallback：依赖属性值被强制改变时此委托会被调用，此委托可关联一个影响
        函数。
    -   DefaultValue：依赖属性未被显式赋值时，若读取之则获得此默认值，不设此值会抛出异常。
    -   IsSealed:控制PropertyMetadata的属性值是否可以更改，默认值为 true。
    -   PropertyChangedCallback：依赖属性的值被改变之后此委托会被调用，此委托可关联一个
        影响函数。

注意:

-   依赖属性的包装器（Wrapper）是一个CLR属性，因为初学者头脑中“属性”的概念就是CLR属性，所以常常把包装器误认为是依赖属性，而**实际上依赖属性就是那个由publicstaticreadonly修饰的DependencyProperty实例**，有没有包装器这个依赖属性都存在
-   既然有没有包装器依赖属性都存在，那么包装器是干什么用的呢？**包装器的作用是以“实例属性”的形式向外界暴露依赖属性，这样，一个依赖属性才能成为数据源的一个Path**
-   注册依赖属性时使用的第二个参数是一个数据类型，**这个数据类型也是包装器的数据类型，它的全称应该是“依赖属性的注册类型”**，但一般情况下也会把这个类型类型称为“依赖属性的类型”（严格地说、依赖属性的类型永远都是
    DependencyProperty，只是工作中叫习惯了）

上面例子完整使用

xaml代码

~~~xaml
<StackPanel>
    <TextBox
        x:Name="textBox1"
        Width="300"
        Height="30"
        Margin="5"
        BorderBrush="Black" />
    <TextBox
        x:Name="textBox2"
        Width="300"
        Height="30"
        Margin="5"
        BorderBrush="Black" />
    <Button
        Width="300"
        Height="30"
        Margin="5"
        Click="BtnOk_Click"
        Content="OK" />
</StackPanel>
~~~

后台c#代码

~~~c#
public class DependencyStudent : DependencyObject
{
    public static readonly DependencyProperty NameProrperty =
        DependencyProperty.Register("Name", typeof(string), 
                                    typeof(DependencyStudent)
                                   );
}

private void BtnOk_Click(object sender, RoutedEventArgs e)
{
    DependencyStudent student = new DependencyStudent();
    student.SetValue(DependencyStudent.NameProrperty, this.textBox1.Text);
    textBox2.Text = student.GetValue(DependencyStudent.NameProrperty) as string;
}
~~~

通过添加CLR属性，对依赖属性进行包装能够更方便地使用依赖属性

~~~c#
 public class DependencyStudent : DependencyObject
 {
     public static readonly DependencyProperty NameProrperty =
         DependencyProperty.Register("Name", typeof(string), typeof(DependencyStudent));
     public string Name
     {
         get { return GetValue(NameProrperty) as string; }
         set { SetValue(NameProrperty, value); }
     }
 }
~~~

这样的话，如果不关心底层的实现，下游程序员在使用依赖属性时与使用单纯的CLR属性感觉别无二致。

依赖对象可以通过Binding依赖在其他对象上，即依赖对象是作为数据的目标而存在的。现在，为依赖对象的依赖属性添加了CLR属性包装，**有了这个包装，就相当于为依赖对象准备了用于暴露数据的BindingPath**，也就是说，现在的依赖对象已经具备了扮演数据源和数据目标双重角色的能力。

值得注意的是，尽管DependencyStudent类没有实现INotifyPropertyChanged接口，当属性的值发生改变时与之关联的Binding对象依然可以得到通知，依赖属性默认带有这样的功能，天生就是合格的数据源。

### 依赖属性的存储

因为依赖对象的依赖属性是一个static对象，所以值不可能是保存在这个对象里，不然几百个实例都进行赋值时到底应该保存哪个、丢掉哪个？显然，WPF有一套机制来存取依赖属性的值。

依赖属性的使用大致分为两个步骤：

第一步，在DependencyObject派生类中声明public static修饰的DependencyProperty成员变量，并使用DependencyProperty.Register方法（而不是new操作符）获得DependencyProperty的实例；

第二步，使用DependencyObject的SetValue和GetValue方法、借助DependencyProperty实例来存取值。

所以，要重点要分析的就是**DependencyProperty.Register方法**，**DependencyObject.SetVaule方法**和**DependencyObject.GetValue**方法。
先来研究DependencyProperty.Register方法。顾名思义，这个方法不仅要创建DependencyProperty实例，还要对它进行“注册”。这样问题就来了——DependencyProperty实例被注册到哪里了呢？

注册到了DependencyProperty类中的Hashtable属性中。

阅读源码，会发现DependencyProperty类具有这样一个成员：
~~~c#
private static Hashtable PropertyFromName = new Hashtable:
~~~

显然，一旦程序运行，就会有这样一个全局的**Hashtable**存在，这个Hashtable就是用来注册DependencyProperty实例的地方。在源码中，所有的DependencyProperty.Register方法重载最后都归结为对DependencyProperty.RegisterCommon方法的调用（可以把RegisterCommon理解为Register方法的“完整版”)
RegisterCommon方法的原型如下：

~~~c#
private static DependencyProperty RegisterCommon
{
	string name,
	Type property Type,
	Type ownerType,
	PropertyMetadata defaultMetadata,
	Validate ValueCallback validate ValueCallback
}
~~~

前四个参数与上面的Register方法参数一致，进入方法内部可以发现

~~~c#
FromNameKey key = new FromNameKey(name, ownerType);
//FromNameKey是一个.NET Framework内部数据类型。它的构造器代码如下：
public FromNameKey(string name, Type ownerType)
{
	_name =name;
	_ownerType = ownerType;
	_hashCode = _name.GetHashCode()^_ownerType.GetHashCode();
}
// 同时对于上面的私有成员类，有对应override的GetHashCode()方法
public override int GetHashCode()
{
	return_hashCode;
}
~~~

FromNameKey对象（也就是变量key）的hashcode实际上是RegisterCommon第1个参数（CLR属性名字符串）的hash code与第3个参数（宿主类型）的hashcode做异或运算得来的。

这样操作，每对“CLR属性名一宿主类型”所决定的DependencyProperty实例就是唯一的。

于是可以一句话概括DependencyProperty对象的创建与注册，那就是：创建一个DependencyProperty实例并用它的CLR属性名和宿主类型名生成hashcode，最后把hashcode和DependencyProperty实例作为Key-Value对存入全局的、名为PropertyFromName的Hashtable中。这样，WFP属性系统通过CLR属性名和宿主类型名就可以从这个全局的Hashtable中检索出对应的DependencyProperty实例。最后，生成的DependencyProperty实例被当作返回值交还：

~~~c#
return dp；  //DependencyProperty
~~~

注：

把DependencyProperty实例注册进全局Hashtable时使用的key由CLR属性名哈希值和宿主类型哈希值经过运算得到，但这并不是DependencyProperty实例的哈希值。每个DependencyProperty实例都具有一个名为Globalindex的int类型属性，GlobalIndex的值是经过一些算法处理得到的，确保了每个 DependencyProperty实例的Globalindex是唯一的。

~~~mermaid
%%{init: {'theme':'dark'}}%%
flowchart  TB
    
    A([开始]):::startend --> B(创建继承自 DependencyObject 的类):::process
    B --> C(声明静态只读 DependencyProperty 字段):::process
    C --> D(调用 Register 方法注册依赖属性):::process
    D --> E{检查属性是否重复注册}:::decision
    E -->|否| F(生成 GlobalIndex):::process
    E -->|是| G(报错，终止注册):::process
    F --> H(完成依赖属性注册):::process
    H --> I(创建依赖对象实例):::process
    I --> J{操作类型}:::decision
    J -->|设置值| K(调用 SetValue 方法):::process
    J -->|获取值| L(调用 GetValue 方法):::process
    K --> M(在 EffectiveValueEntry 数组中根据 GlobalIndex 存储值):::process
    L --> N(在 EffectiveValueEntry 数组中根据 GlobalIndex 查找值):::process
    M --> O([结束]):::startend
    N --> O
   
~~~

~~~MERMAID
%%{init: {'theme':'dark'}}%%
graph LR
    
    A(DependencyObject实例):::entity 
    B(DependencyProperty实例):::entity
    B -->|定义属性元数据| A
    A -->|存储属性值| C(EffectiveValueEntry数组):::process
    C -->|关联| B
    
    subgraph "依赖属性值存储"
    C -.->|通过GlobalIndex查找| D(存储具体值):::process
    end
~~~

可以看出依赖属性的实现的本质就是一个数组，作为DependencyObject的派生类，会有一个EffectiveValueEntry数组，该数组存放着依赖属性的值，这个数组的索引就是依赖属性DependencyProperty实例，通过一系列方法转换DependencyProperty实例得到索引。

因为DependencyProperty实例是静态只读的，所以在内存中是唯一的，而不同的DependencyObject的派生类的实例的EffectiveValueEntry数组是没有关联的，所以对于不同的DependencyObject的派生类，可以通过上面的同一个索引来进行值的更新和获取（避免重复实例DependencyProperty类）。

因为EffectiveValueEntry数组是动态的，只有DependencyObject的派生类添加依赖属性的值的时候才进行空间的开辟，而普通的实例的方法是一次性开辟所有的空间，所以从某方面来说实现了空间的节约（只有用的时候才进行控件的开辟）。

### 附加属性

顾名思义，**附加属性是说一个属性本来不属于某个对象，但由于某种需求而被后来附加上**。也就是把对象放入一个特定环境后对象才具有的属性（表现出来就是被环境赋予的属性）就称为附加属性（AttachedProperties)

比如有一个名为Human的类，它有可能被与学校相关的工作流用到（记录它的专业、班级、年级），也有可能被与公司相关的工作流用到（记录它的部门、项目）

~~~c#
public class Human
{
    public Int ID {get; set;}
	// For school workflow
	public int MajorId {get; set;}
	public int ClassId {get; set;}
	public int GradeId {get; set;}
	// For company workflow
	public int DepartmentId {get; set;}
	public int ProjectId {get; set;}
}
~~~

但是，如果需要添加家庭方面的工作流，则需要对类进行修改，添加相关属性，从而导致类越来越臃肿。

同时在WPF布局中，作为TextBox控件的设计者，他不可能知道控件发布后程序员是把它放在Grid里还是Canvas
里（甚至是以后版本将推出的新布局里)，所以他也不可能为TextBox准备诸如Column、Row或者Left、Top这类属性，那么干脆让布局来决定一个TextBox用什么属性来设置它的位置吧！放在Grid里就让Grid为它附加上Column和Row属性，放在Canvas里就让Canvas为它附加上 Top、Left等属性，放在DockPanel里就让DockPanel为它附加Dock属性。可见，附加属性的作用就是将**属性与数据类型（宿主）解耦**，让数据类型的设计更加灵活。

附加属性的本质就是依赖属性，二者仅在注册和包装器上有一点区别。

附加属性的声明、注册和使用，附加属性是一种特殊的依赖属性，基本使用和依赖属性基本一致。

基本实例

~~~xaml
<StackPanel>
    <Button
        Width="300"
        Height="50"
        Margin="10"
        Content="click me" 
        Click="BtnCheck_Click"/>
</StackPanel>
~~~

后台click代码

~~~c#
// 依赖对象
internal class School : DependencyObject
{
    public static int GetGrade(DependencyObject obj)
    {
        return (int)obj.GetValue(GradeProperty);
    }

    public static void SetGrade(DependencyObject obj, int value)
    {
        obj.SetValue(GradeProperty, value);
    }
	
    // 依赖属性
    public static readonly DependencyProperty GradeProperty =
        DependencyProperty.RegisterAttached("Grade", typeof(int), typeof(School), new PropertyMetadata(0));

}

internal class Human : School
{

} 

// 点击事件
private void BtnCheck_Click(object sender, RoutedEventArgs e)
 {
     Human human = new Human();
     School.SetGrade(human, 114514);
     int grade = School.GetGrade(human);
     MessageBox.Show(grade.ToString());
 }
~~~

可以看出附加属性的使用跟依赖属性差不多，而附加属性的附加性体现在只有在特定环境需要时，才会为这个要附加的属性开辟空间，类似于依赖属性的实现中的EffectiveValueEntry数组通过依赖属性的实例的属性获取的索引进行依赖属性的值的添加和更新。

总之附加属性的实现实际上就是，通过继承得到的EffectiveValueEntry数组去存放要附加的属性的值。

简单示例，滑块移动

~~~xaml
<Canvas>
    <Slider
        x:Name="sliderX"
        Canvas.Left="10"
        Canvas.Top="10"
        Width="260"
        Maximum="150"
        Minimum="50"
        Value="50" />
    <Slider
        x:Name="sliderY"
        Canvas.Left="10"
        Canvas.Top="40"
        Width="260"
        Maximum="150"
        Minimum="50"
        Value="80" />
    <Rectangle
        x:Name="rect"
        Canvas.Left="{Binding ElementName=sliderX, Path=Value}"
        Canvas.Top="{Binding ElementName=sliderY, Path=Value}"
        Width="30"
        Height="30"
        Fill="Red" />
</Canvas>
~~~

效果展示，通过更改Slider位置实现Rectangle的移动

![image-20250322203144723](C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250322203144723.png)



## 事件

事件系统在WPF中也被升级进化成为**路由事件**（RoutedEvent)，并在其基础上街生出命令传递机制。这些机制在很大程度上减少了对程序员的束缚，让程序的设计和实现更加灵活，模块之间的耦合度也进一步降低。

### WPF的树形结构	

路由（Route）一词的大意是这样：起点与终点间有若干个中转站，从起点出发后经过每个中转站时要做出选择，最终以正确（比如最短或者最快）的路径到达终点

Windows本身就是一种消息驱动的操作系统，所以在上面的程序注定都是消息驱动的，程序运行的时候也要把
自己的消息系统与整个操作系统的消息系统“连通”才能够被执行和响应。纵观几代Windows平台程序开发，最早的WindowsAPI开发（C语言）和MFC开发可以直接看到各种消息并可以定义自己的消息；到了COM和VB时代，消息被封装为事件(Event)并一直沿用至.NET平台开发

无论怎么说，程序间模块使用消息互相通信的本质是没有改变的。从WindowsAPI开发到传统的.NET开发，消息的传递（或者说事件的激发与响应）都是直接模式的，**即消息直接由发送者交给接收者（或者说事件宿主发生的事件直接由事件响应者的事件处理器来处理）**。WPF把这种直接消息模型升级为可传递的消息模型

而WPF的UI是由布局组件和控件构成的树形结构，当这棵树上的某个结点激发出某个事件时，程序员可以选择以传统的直接事件模式让响应者来响应，也可以让这个事件在UI组件树沿着一定的方向传递且路过多个中转结点，并在这个路由过程中被恰当地处理。

WPF中有两种“树”：一种叫逻辑树(Logical Tree)，一种叫可视元素树(Visual Tree)。

**LogicalTree** 最显著的特点就是它完全由布局组件和控件构成（包括列表类控件中的条目元素)，换句话说就是
它的每个结点不是布局组件就是控件。

那什么是VisualTree呢？如果把一片树叶放在放大镜下观察，你会发现这片叶子也像一棵“树”一样——有自己的基部并向上生长出多级分叉。在WPF的LogicalTree上，充当叶子的一般都是控件，如果把WPF的控件也放在“放大镜”下去观察，就会发现每个WPF控件本身也是一棵由更细微级别的组件（它们不是控件，而是一些可视化组件，派生自Visual类）组成的树。

总结：

**可视化树**：包含最初指定的大多数元素（在XAML或.cs中）以及控件模板中的元素。

通俗点来讲，就是整个元素的构成树，从最上面的结点到最后一个结点（包括控件模板）。

**逻辑树**：是可视化树的一个子集，它省略了控件模板中的元素。

### 事件的来源

事件的前身是消息（Message)。**Windows是消息驱动的操作系统**，运行其上的程序也遵照这个机制运行。**消息本质就是一条数据**，**这条数据里记载着消息的类别，必要的时候还记载一些消息参数**。

比如，当在窗体上按下鼠标左键的时候，一条名为WMLBUTTONDOWN消息就被生成并加入Windows待处理的消息队列中——大部分情况下Windows的消息队列里不会有太多消息在排队、消息会立刻被处理，如果当前的计算机很慢并且处在很忙的状态（如播放电影），那么这条消息就要等一会才被处理到，这就是常见的操作系统反应延迟。

当Windows处理到这条消息时会把消息发送给你单击的窗体，窗体会用自己的一套算法来响应这个消息，这个算法就是WindowsAPI开发中常说的消息处理函数。

消息处理函数中有一个多级嵌套的switch结构，进入这个switch结构的消息会被分门别类并最终流入某个末端分支，在这个分支里会有一个由程序员编写的函数被调用。例如对于WM_LBUTTONDOWN这个消息，程序员可能会编写一个函数来查看它所携带的参数（即鼠标单击处的X、Y坐标），然后决定是把它们显示出来还是在这个点上绘制图形等。也有些消息是不用携带参数的，比如按钮被单击的消息，当它流入某个分支后程序员就已经知道是按钮被单击了，程序员并不关心鼠标点在按钮的哪个位置上了。

而事件模型隐藏了消息机制的很多细节，让程序的开发变得简单。烦琐的消息驱动机制在事件模型中被简化为3个关键点：

-   **事件的拥有者**：即消息的发送者。事件的宿主可以在某些条件下激发它拥有的事件，即事件被触发。事件被触发则消息被发送
-   **事件的响应者**：即消息的接收者、处理者。事件接收者使用其事件处理器(EventHandler)对事件做出响应
-   **事件的订阅关系**：事件的拥有者可以随时激发事件，但事件发生后会不会得到响应要看有没有事件的响应者，或者说要看这个事件是否被关注。如果对象A关注对象B的某个事件是否发生，则称A订阅了B的事件。更进一步讲，事件实际上是一个使用event关键字修饰的委托（Delegate）类型成员变量，事件处理器则是一个函数，说A订阅了B的事件，本质上就是让**B.Event与A.EventHandler关联起来**。所谓事件激发就是B.Event被调用，这时，与其关联的A.EventHandler就会被调用

~~~mermaid
%%{init: {'theme':'dark'}}%%
flowchart RL
 	subgraph 事件响应者
 		b[事件处理器]
	end
	subgraph 事件的拥有者
 		a[事件]
 	end

b-- 订阅 ---a	
~~~

在这种模型里，事件的响应者通过订阅关系直接关联在事件拥有者的事件上。

直接事件模型的弱点会在下面两种情况中显露出来:

-   程序运行期在容器中动态生成一组相同控件，每个控件的同一个事件都使用同一个事件处理器来响应。面对这种情况，我们在动态生成控件的同时就需要显式书写事件订阅代码
-   用户控件的内部事件不能被外界所订阅，必须为用户控件定义新的事件用以向外界暴露内部事件。当模块划分很细的时候，UI组件的层级会很多，如果想让很外层的容器订阅深层控件的某个事件就需要为每一层组件定义用于暴露内部事件的事件、形成事件链

### 路由事件

为了降低由事件订阅带来的耦合度和代码量，WPF推出了路由事件机制。

路由事件与直接事件的区别在于，直接事件激发时，发送者直接将消息通过事件订阅交送给事件响应者，事件响应者使用其事件处理器方法对事件的发生做出响应、驱动程序逻辑按客户需求运行；

路由事件的**事件拥有者和事件响应者之间则没有直接显式的订阅关系**，事件的拥有者只负责激发事件，事件将由谁响应它并不知道，事件的响应者则安装有**事件侦听器**，针对某类事件进行侦听，当有此类事件传递至此时事件响应者就使用事件处理器来响应事件并决定事件是否可以继续传递。

举个例子，在VisualTree上有一个Button控件，当它被单击后就相当于它喊了一声“我被单击了”，这样一个Button.Click事件就开始在VisualTree传播，当事件经过某个结点时如果这个结点没有安装用于侦听Button.Click事件的“耳朵”，那么它会无视这个事件，让它畅通无阻地继续传播，如果某个结点安装了针对Button.Click的侦听器，它的事件处理器就会被调用（侦听者并不关心具体哪个Button的Click事件被传来，即任何一个传来的Button.Click事件都会被侦听到)，在事件处理器内程序员可以查看路由事件原始的出发点是哪个控件、上一站是哪里，还可以决定事件传递到此为止还是可以继续传递一—路由事件就是这样依靠“口耳相传”的办法将消息传给“关心”它的控件。

#### 内置路由事件示例

WPF系统中的大多数事件都是可路由事件，这里监听Button的路由事件

~~~xaml
<Grid x:Name="gridRoot" Background="Lime">
    <Grid
        x:Name="gridA"
        Margin="10"
        Background="Blue">
        <Grid.ColumnDefinitions>
            <ColumnDefinition />
            <ColumnDefinition />
        </Grid.ColumnDefinitions>
        <Canvas
            x:Name="canvasLeft"
            Grid.Column="0"
            Background="Red">
            <Button
                x:Name="btnLeft"
                Canvas.Left="49"
                Canvas.Top="154"
                Width="200"
                Height="100"
                HorizontalAlignment="Center"
                VerticalAlignment="Top"
                Click="ButtonLeft_Click"
                Content="left" />
        </Canvas>
        <Canvas
            x:Name="canvasRight"
            Grid.Column="1"
            Background="Yellow">
            <Button
                x:Name="btnRight"
                Canvas.Left="49"
                Canvas.Top="154"
                Width="200"
                Height="100"
                HorizontalAlignment="Center"
                VerticalAlignment="Top"
                Content="Right" />
        </Canvas>
    </Grid>
</Grid>
~~~

显示的界面：

<img src="C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250320103009781.png" alt="image-20250320103009781" style="zoom:67%;" />

因为 Button.Click是一个路由事件，当单击  时，Button.Click事件就会沿着buttonLeft→canvasLeft->gridA->girdRoot
Window这条路线向上传送；单击 buttonRight，则Button.Click事件沿着buttonRight -> canvasRight -> gridA -> gridRoot -> Window路线传送。因为目前还没有哪个控件侦听Button.Click事件，所以单击按钮后尽管事件向上传递却并没有受到响应。

下面，为gridRoot安装针对Button.Click事件的侦听器。

~~~c#
public MainWindow()
{
    InitializeComponent();
    // 给gridRoot 添加监听器，监听Button.ClickEvent事件，当Button.ClickEvent经过它时，调用			     
    // RoutedEventHandler类型方法ButtonLeft_Click
    this.gridRoot.AddHandler(Button.ClickEvent, 
                             new RoutedEventHandler(this.ButtonLeft_Click)
                            ) ;
}
private void ButtonLeft_Click(object sender, RoutedEventArgs e)
{
    MessageBox.Show((e.OriginalSource as FrameworkElement).Name);
}
~~~

#### 自定义路由事件

为了方便程序中对象之间的通信常需要自已定义一些路由事件。

创建自定义路由事件大体可以分为三个步骤：

-   声明并注册路由事件
-   为路由事件添加CLR事件包装
-   创建可以激发路由事件的方法

WPF路由事件有3种路由策略：

-   **Bubble**：冒泡式：路由事件由事件的激发者出发向它的上级容器一层一层路由，直至最外层容器（Window或者Page)。因为是由树的底端向顶端移动，而且从事件激发元素到UI树的树根只有确定的一条路径，所以这种策略被形象地命名为“冒泡式”。
-   **Tunnel**：隧道式：事件的路由方向正好与Bubble策略相反，是由UI树的树根向事件激发控件移动。因为从UI树根向树底移动时有很多路径，但我们希望是由树根向激发事件的控件移动，这就好像在树根与目标控件之间挖掘了一条隧道，事件只能沿着隧道移动，所以称之为“隧道式”。
-   **Direct**：直达式：模仿CLR直接事件，直接将事件消息送达事件处理器。

路由事件例子：报告事件发生的时间

~~~xaml
<Window
    x:Class="WpfApp2.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:carShow="clr-namespace:WpfApp2.View.MyUserControl"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:entity="clr-namespace:WpfApp2.Entity"
    xmlns:local="clr-namespace:WpfApp2;assembly=WpfApp2"
    xmlns:local1="clr-namespace:WpfApp2.Person"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:myBtn="clr-namespace:WpfApp2.MyRouteEvent"
    xmlns:sys="http://schemas.microsoft.com/winfx/2009/xaml"
    xmlns:sys1="clr-namespace:System;assembly=mscorlib"
    x:Name="window_1"
    Title="MainWindow"
    Width="615"
    Height="450"
    myBtn:TimeButton.ReportTime="ReportTimeHandler"
    mc:Ignorable="d">
    <Grid x:Name="grid_1" myBtn:TimeButton.ReportTime="ReportTimeHandler">
        <Grid x:Name="grid_2" myBtn:TimeButton.ReportTime="ReportTimeHandler">
            <Grid x:Name="grid_3" myBtn:TimeButton.ReportTime="ReportTimeHandler">
                <StackPanel x:Name="stackPanel_1" myBtn:TimeButton.ReportTime="ReportTimeHandler">
                    <ListBox x:Name="listBox" />
                    <myBtn:TimeButton
                        x:Name="timeButton"
                        Width="80"
                        Height="80"
                        Content="报时"
                        ReportTime="ReportTimeHandler" />
                </StackPanel>
            </Grid>
        </Grid>
    </Grid>
</Window>
~~~

相关自定类c#代码

~~~c#
// 自定义事件参数类，继承自 RoutedEventArgs 类，用于在自定义路由事件中携带点击时间信息
class ReportTimeEventsArgs : RoutedEventArgs
{
    public ReportTimeEventsArgs(RoutedEvent routedEvent, object source) :
        base(routedEvent, source){}

    // 记录按钮点击的时间
    public DateTime ClickTime { get; set; }
}

// 自定义按钮控件，继承自 Button 类，用于触发 ReportTime 路由事件，携带点击时间信息
class TimeButton : Button
{
    // ReportTime 路由事件用于在按钮点击时触发，携带点击时间信息，采用冒泡路由策略
    public static readonly RoutedEvent ReportTimeEvent = EventManager.RegisterRoutedEvent
        (
            "ReportTime",
            RoutingStrategy.Bubble,
            typeof(RoutedEventHandler),
            typeof(TimeButton)
        );

    // 路由事件 CLR 装饰器，便于更好地使用路由事件
    public event RoutedEventHandler ReportTime
    {
        add { this.AddHandler(ReportTimeEvent, value); }
        remove { this.RemoveHandler(ReportTimeEvent, value); }
    }

    // 重写 Button 的 OnClick 方法，添加自定义控件点击处理逻辑
    protected override void OnClick()
    {
        // 首先调用 Button 的 OnClick 方法，执行 Button 控件的原本方法
        base.OnClick();

        // 创建事件参数对象，设置路由事件和事件源
        ReportTimeEventsArgs args = new ReportTimeEventsArgs(ReportTimeEvent, this);
        // 记录按钮点击的时间
        args.ClickTime = DateTime.Now;

        // 触发路由事件，让路由事件开始在可视化树上传播，将事件参数传递给事件处理程序
        this.RaiseEvent(args);
    }
}
~~~

事件处理器

~~~c#
// 事件处理器
private void ReportTimeHandler(object sender, ReportTimeEventsArgs e)
 {
     // 获取事件发送者的名称
     FrameworkElement element = sender as FrameworkElement;
     // 设置当前时间
     e.ClickTime = DateTime.Now;
     string timeStr = e.ClickTime.ToString("MM-dd-HH-mm-ss.ffffff");
     string content = string.Format("{0} 到达 {1}", timeStr, element.Name);
     // 以当前时间为内容，添加到Items控件之中
     this.listBox.Items.Add(content);
 }
~~~

效果展示

<img src="C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250323152525994.png" alt="image-20250323152525994" style="zoom: 67%;" />

因为，为TimeButton注册ReportTimeEvent时使用的是Bubble策略，所以事件是沿这样的路径由内向外传递的
TimeButton→StackPanel→Grid-Grid-Grid-Window.

更改路由策略,为Tunnel

~~~c#
public static readonly RoutedEvent ReportTimeEvent = EventManager.RegisterRoutedEvent(
    "ReportTime",
    RoutingStrategy.Tunnel, 
    typeof(EventHandler<ReportTimeEventsArgs>), 
    typeof(TimeButton)
);
~~~

<img src="C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250323152918002.png" alt="image-20250323152918002" style="zoom:67%;" />

正好与Bubble策略相反，Tunnel策略使事件沿着从外向内的路径传递：

Window->Grid->Grid->Grid->StackPanel->TimeButton。

通过设置路由事件的Handled属性，来决定是否继续传播

~~~c#
private void ReportTimeHandler(object sender, ReportTimeEventsArgs e)
{
    FrameworkElement element = sender as FrameworkElement;
    e.ClickTime = DateTime.Now;
    string timeStr = e.ClickTime.ToString("MM-dd-HH-mm-ss.ffffff");
    string content = string.Format("{0} 到达 {1}", timeStr, element.Name);
    this.listBox.Items.Add(content);
    if (element == this.grid_3)
    {
        // 设置为true表示，事件已经处理，不用继续传播
        e.Handled = true;
    }
}
~~~

结果

<img src="C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250323153457959.png" alt="image-20250323153457959" style="zoom:67%;" />

总结：

-   路由事件将程序中的组件进一步解耦（比用直接事件传递消息还要松散)，使程序员可以更自由地编写代码、实现设计。
-   很多类的事件都是路由事件，如TextBox 类的TextChanged 事件、Binding 类的 SourceUpdated事件等，所以在用到这些类型的时候不要墨守传统.NET编程带来的习惯，要发挥自己的想象力，让程序结构更加合理、代码更加简洁。
-   路由事件虽好，但也不要滥用，举个例子，如果让所有Button（包括组件里的Button）的Click事件都传递到最外层窗体，让窗体捕捉并处理它，那么程序架构就变得毫无意义了。正确的办法是，事件该由谁来捕捉处理，传到这个地方时就应该处理掉。

#### RoutedEventArgs的 Source 与  OriginalSource

路由事件是沿着VisualTree传递的。

VisualTree与LogicalTree的区别就在于：LogicalTree的叶子结点是构成用户界面的控件，而VisualTree要连控件中的细微结构（template）也算上。

而“路由事件在VisualTree上传递”，本意上是说“路由事件的消息在VisualTree上传递”，而路由事件的消息则包含在RoutedEventArgs实例中。RoutedEventArgs有两个属性Source和OriginalSource，这两个属性都表示路由事件传递的起点（即事件消息的源头)，只不过Source表示的是LogicalTree上的消息源头，而OriginalSource则表示VisualTree上的源头。

实例：

首先添加自定义控件，该控件是一个border加button组成，外面是一个border套着一个button

~~~xaml
<UserControl
    x:Class="WpfApp2.MyUserControl.NewButton"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:local="clr-namespace:WpfApp2.MyUserControl"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    d:DesignHeight="450"
    d:DesignWidth="800"
    mc:Ignorable="d">
    <Border
        BorderBrush="Orange"
        BorderThickness="3"
        CornerRadius="5">
        <Button
            x:Name="innerButton"
            Width="80"
            Height="80"
            Content="innerBtn" />
    </Border>
</UserControl>

~~~

在主窗口使用这个控件

~~~xaml
<Grid>
    <newBtn:NewButton x:Name="myNewBtn" Margin="50" />
</Grid>
~~~

在后台添加事件监听

~~~c#
this.AddHandler(Button.ClickEvent, new RoutedEventHandler(Button_Click));
// 事件处理器，会输出事件的来源
 private void Button_Click(object sender, RoutedEventArgs e)
 {
     string strOriginalSource = string.Format(
         "VisualTree start point: {0},type is {1}",
         (e.OriginalSource as FrameworkElement).Name,
         e.OriginalSource.GetType().Name
         );

     string strSource = string.Format(
         "LogicTree start point: {0},type is {1}",
         (e.Source as FrameworkElement).Name,
         e.Source.GetType().Name
         );
     MessageBox.Show(strOriginalSource + "\r\n" + strSource);
 }
~~~

效果展示

<img src="C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250323161930388.png" alt="image-20250323161930388" style="zoom:67%;" />

点击按钮弹出提示框，显示事件源头

![image-20250323162002771](C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250323162002771.png)

Button.Click路由事件是从自定义控件NewButton的innerButton发出来的,在主窗体中,myNewBtn是LogicalTree的末端结点，所以e.Source就是myNewBtn;

而窗体的VisualTree则包含了自定义控件NewButton的内部结构，可以“看见”路由事件究竟是从哪个控件发出来的，所以使用e.OriginalSource可以获得innerButton。

### 附加事件

附加事件是 WPF 事件系统中一种**特殊的路由事件**。它与普通路由事件的区别在于，附加事件的**宿主不具备界面渲染功能，没有可视化实体**，不像 Button、Slider、TextBox 等拥有路由事件的类那样是具有可视化实体的界面元素。

例如 Binding 类的 SourceUpdated 事件、TargetUpdated 事件，Mouse 类的 MouseEnter 事件、MouseLeave 事件、MouseDown 事件、MouseUp 事件，Keyboard 类的 KeyDown 事件、KeyUp 事件等都是附加事件，这些类本身不能直接显示在用户界面上，但可以通过附加事件与其他对象进行沟通。

实例：实现一个RoutedStudent类，如果RoutedStudent实例的Name属性值发生了变化就激发一个路由事件，并使用界面元素来捕捉这个事件

RoutedStudent类

~~~c#
 class RoutedStudent
 {
     public static readonly RoutedEvent NmaeChangedEvent =EventManager.RegisterRoutedEvent        (
         "NameChanged",
         RoutingStrategy.Bubble,
         typeof(RoutedEventHandler),
         typeof(RoutedStudent)
         );
     public int StudentId { get; set; }
     public string Name { get; set; }
 }
~~~

ui页面

~~~xaml
<Grid x:Name="gridMain">
    <Button
        x:Name="button_1"
        Width="80"
        Height="80"
        Click="Button_Click"
        Content="ok" />
</Grid>
~~~

后台代码

~~~c#
public MainWindow()
{
    InitializeComponent();
    // 在gridMain处设置监听
    this.gridMain.AddHandler(
        RoutedStudent.NameChangedEvent, 
        new RoutedEventHandler(this.StudentNameChangedHandler)
        );
}

// 处理学生姓名更改事件的处理程序，显示触发事件的学生姓名
private void StudentNameChangedHandler(object sender, RoutedEventArgs e)
{
    MessageBox.Show((e.OriginalSource as RoutedStudent).Name.ToString());
}

// 点击事件
private void Button_Click(object sender, RoutedEventArgs e)
{
    RoutedStudent student = new RoutedStudent() { StudentId = 114514, Name = "b3q" };
    student.Name = "mxxy";
    // 触发事件之后，封装相关数据，存储事件相关信息，包括事件是什么，来源是什么
    RoutedEventArgs args = new RoutedEventArgs(RoutedStudent.NameChangedEvent, student); 
    // 让路由事件开始传播
    this.button_1.RaiseEvent(args);
}
~~~

后台代码中，当界面上唯一的Button被单击后会触发Button_Click这个方法。有一点必须注意的是：因为RoutedStudent不是UIElement的派生类，所以它不具有RaiseEvent这个方法，为了发送路由事件就不得不“借用”一下Button的RaiseEvent方法了。在窗体的构造器中为Grid元素添加了对RoutedStudent.NameChangedEvent的侦听，这与添加对路由事件的侦听没有任何区别。Grid在捕捉到路由事件后会显示事件消息源（一个RoutedStudent实例）的Id。

理论上现在的RoutedStudent类已经算是具有一个附加事件了，但微软的官方文档约定要为这个附加事件添加一个CLR包装以便XAML编辑器识别并进行智能提示。可惜的是，RoutedStudent类并非派生自UIElement，因此亦不具备AddHandler和RemoveHandler这两个方法，所以不能使用CLR属性作为包装器（因为CLR属性包装器的add和remove分支分别调用当前对象的AddHandler和RemoveHandler)。

微软规定:

-   为目标UI元素添加附加事件侦听器的包装器是一个名为**Add * Handler**的public static方法，星号代表事件名称（与注册事件时的名称一致）。此方法接收两个参数，第一个参数是事件的侦听者（类型为DependencyObject ），第二个参数为事件的处理器(RoutedEventHandler委托类型)。
-   解除UI元素对附加事件侦听的包装器是名为**Remove * Handler**的public static方法，星号亦为事件名称，参数与Add*Handler一致。

按照标准更改的RoutedStudent类

~~~c#
class RoutedStudent
{
    public static readonly RoutedEvent NameChangedEvent = EventManager.RegisterRoutedEvent 		   (
        "NameChanged",
        RoutingStrategy.Bubble,
        typeof(RoutedEventHandler),
        typeof(RoutedStudent)
        );
    
    public static void AddNameChangedHandler(DependencyObject d, RoutedEventHandler h)
    {
        UIElement e = d as UIElement;
        if (e != null)
        {
            e.AddHandler(RoutedStudent.NameChangedEvent, h);
        }
    }

    public static void RemoveNameChangedHandler(DependencyObject d, RoutedEventHandler h)
    {
        UIElement e = d as UIElement;
        if (e != null)
        {
            e.RemoveHandler(RoutedStudent.NameChangedEvent, h);
        }
    }

    public int StudentId { get; set; }
    public string Name { get; set; }
}
~~~

同时原来的代码也要改动

~~~c#
public MainWindow()
{
    InitializeComponent();
    RoutedStudent.AddNameChangedHandler(
        this.gridMain,
        new RoutedEventHandler(StudentNameChangedHandler)
    );
}
~~~

UIElement类是路由事件宿主与附加事件宿主的分水岭，不单是因为从UIElement类开始才具备了在界面上显示的能力，还因为RaiseEvent、AddHandler和RemoveHandler这些方法也定义在UIElement类中。因此，**如果在一个非UIElement派生类中注册了路由事件**，则这个类的实例既不能自己激发（Raise）此路由事件也无法自己侦听此路由事件，只能把这个**事件的激发“附着”在某个具有RaiseEvent方法的对象上**，借助这个对象的RaiseEvent方法把事件发送出去；事件的侦听任务也只能交给别的对象去做。

总结：

-   第一，像Button.Click这些路由事件，因为事件的宿主是界面元素、本身就是UI树上是一个结点，**所以路由事件路由时的第一站就是事件的激发者**。附加事件宿主不是UlElement的派生类，所以不能出现在UI树上的结点，而且附加事件的激发是借助UI元素实现的，因此，而**附加事件路由的第一站是激发它的元素**。
-   第二，实际上很少会把附加事件定义在RoutedStudent这种与业务逻辑相关的类中，一般都是定义在像Binding、Mouse、Keyboard这种全局的Helper类中。如果需要业务逻辑类的对象能发送出路由事件来怎么办?不是有Binding吗，如果程序架构设计的好（使用数据驱动UI)，那么**业务逻辑一定会使用Binding对象与UI元素关联**，一旦与业务逻辑相关的对象实现了INotifyPropertyChanged接口并且Binding对象的NotifyOnSourceUpdated属性设为true，则Binding就会激发其SourceUpdated附加事件，此事件会在UI元素树上路由并被侦听者捕获。



## 命令

WPF 命令是将用户操作与相关的处理逻辑进行分离和抽象的一种机制。它将操作定义为一个独立的对象，这个对象可以被多个不同的界面元素**共享和使用**。例如，“保存” 命令可以被应用程序中的菜单、工具栏按钮以及快捷键等多种方式触发，而这些触发方式都共享同一个 “保存” 命令的执行逻辑。

-   **统一操作逻辑**：在应用程序中，可能有多个不同的界面元素需要执行相同的操作，如多个地方都需要实现保存功能。使用命令可以确保无论在何处触发保存操作，都执行相同的代码逻辑，保证了操作的一致性。
-   **提高代码可维护性**：将操作逻辑封装在命令中，当需要修改保存功能的实现时，只需在命令对应的代码处进行修改，而不必在每个触发该操作的界面元素的事件处理程序中逐一修改，降低了维护成本。
-   **增强交互性和用户体验**：命令可以方便地与各种交互方式（如键盘快捷键、鼠标操作等）进行关联，为用户提供多种便捷的操作方式，提升用户体验。同时，命令还支持状态感知，例如可以根据当前应用程序的状态来启用或禁用相关的操作，使界面更加友好和易用。

虽然，也可以通过自带路由事件完成上面操作，与事件不同，命令具有约束力，能让不同对象执行统一行为。路由事件本身不具有对接收者行为的统一约束。不同的事件处理程序可能会有不同的实现方式，难以保证所有触发保存操作的地方都执行相同的逻辑步骤。而命令可以通过在命令的`Execute`方法中定义统一的逻辑，确保执行的一致性。

另外，命令的使用有助于是代码结构更加清晰，易于管理和扩展。

### 命令的组成和关联

WPF的命令系统由几个基本要素构成，它们是：

-   命令(Command)：WPF的命令实际上就是实现了**ICommand接口的类**，平时使用最多的是RoutedCommand类。还可以自定义命令。
-   命令源(Command Source):即命令的发送者，是实现了**ICommandSource接口的类**。很多界面元素都实现了这个接口，其中包括Button、MenuItem、ListBoxItem等。
-   命令目标(Command Target)：即命令将发送给谁，或者说命令将作用在谁身上。命令目标必须是实现了**InputElement接口**的类。
-   命令关联（CommandBinding)：**负责把一些外围逻辑与命令关联起来**，比如执行之前对命令是否可以执行进行判断、命令执行之后还有哪些后续工作等。

#### 命令的使用

**创建命令类**：即获得一个实现ICommand接口的类，如果命令与具体业务逻辑无关则使用WPF类库中的RoutedCommand类即可。如果想得到与业务逻辑相关的专有命令，则需创建RoutedCommand（或者ICommand接口）的派生类。

**声明命令实例**：使用命令时需要创建命令类的实例。这里有个技巧，一般情况下程序中某种操作只需要一个命令实例与之对应即可。比如对应“保存”这个操作，你可以拿同一个实例去命令每个组件执行其保存功能，因此程序中的命令多使用单件模式（Singletone Pattern）以减少代码的复杂度。

**指定命令的源**：即指定由谁来发送这个命令。如果把命令看作炮弹，那么命令源就相当于火炮。同一个命令可以有多个源。比如保存命令，既可以由菜单中的保存项来发送，也可以由工具栏中的保存图标来发送。需要注意的是，**一旦把命令指派给命令源，那么命令源就会受命令的影响，当命令不能被执行的时候作为命令源的控件将处在不可用状态**。看来命令这种炮弹很智能，当不满足发射条件时还会给用来发射它的火炮上一道保险、避免走火。还需要注意，各种控件发送命
令的方法不尽相同，比如Button和MenuItem是在单击时发送命令，而ListBoxItme单击时表示被选中所以双击时才发送命令。

**指定命令目标**：**命令目标并不是命令的属性而是命令源的属性**，指定命令目标是告诉命令源向哪个组件发送命令，无论这个组件是否拥有焦点它都会收到这个命令。如果没有为命令源指定命令目标，则WPF系统认为**当前拥有焦点的对象就是命令目标**。这个步骤有点像为火炮指定目标。

**设置命令关联**：炮兵是不能单独战斗的，就像炮兵需要侦查兵在射击前观察敌情、判断发射时机，在射击后观测射击效果、帮助修正一样，WPF命令需要CommandBinding在执行前来帮助判断是不是可以执行、在执行后做一些事件来“打扫战场”。

~~~mermaid
%%{init: {'theme':'dark'}}%%
flowchart TD
    subgraph 创建命令类
        A[创建实现ICommand接口的类] -->|与业务逻辑无关| B[使用RoutedCommand类]
        A -->|与业务逻辑相关| C[创建RoutedCommand或ICommand派生类]
    end
    subgraph 声明命令实例
        D[创建命令类实例] --> E[使用单件模式减少复杂度]
    end
    subgraph 指定命令的源
        F[指定命令发送者] --> G[同一命令多个源（如保存命令）]
        G --> H[命令影响命令源（不可用时控件不可用）]
        H --> I[不同控件发送命令方式不同（Button、MenuItem单击，ListBoxItem双击）]
    end
    subgraph 指定命令目标
        J[命令目标是命令源属性] --> K[指定向哪个组件发命令（无指定则焦点对象为目标）]
    end
    subgraph 设置命令关联
        L[WPF命令需CommandBinding] --> M[执行前判断是否可执行]
        L --> N[执行后做清理等操作]
    end
    A --> D
    D --> F
    F --> J
    J --> L
~~~

在命令目标和命令关联之间还有一个微妙的关系。无论命令目标是由程序员指定还是由WPF系统根据焦点所在地判断出来的，一旦某个UI组件被命令源“瞄上”，命令源就会不停地向命令目标“投石问路”，**命令目标就会不停地发送出可路由的PreviewCanExecute和CanExecute附加事件**，命令关联捕捉到这些事件后会把命令能不能发送实时报告给**命令**。类似的，如果命令被发送出来并到达命令目标，命令目标就会发送PreviewExecuted和Executed两个附加事件，这两个事件也会沿着UI元素传递并被命令关联所捕捉，命令关联会完成一些后续的任务。

<img src="C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250325143657071.png" alt="image-20250325143657071" style="zoom:50%;" />

基本示例：实现这样一个需求：定义一个命令，使用Button来发送这个命令，当命令送达TextBox时TextBox会被清空（如果TextBox中没有文字则命令不可被发送)。

界面代码：
~~~xaml
<StackPanel x:Name="stackPanel">
    <Button
        x:Name="btn1"
        Margin="5"
        Content="Send Command" />
    <TextBox
        x:Name="textBoxA"
        Height="100"
        Margin="5,0"
        Text="114514" />
</StackPanel>
~~~

后台c#代码：

~~~c#
public partial class MainWindow : Window
{

    private RoutedCommand _clearCmd = new RoutedCommand("Clear", typeof(MainWindow));

    public MainWindow()
    {		
        InitializeComponent();
        this.btn1.Command = _clearCmd;
        _clearCmd.InputGestures.Add(new KeyGesture(Key.C, ModifierKeys.Alt));

        this.btn1.CommandTarget = this.textBoxA;

        // 创建命令关联
        CommandBinding cb = new CommandBinding();
        cb.Command = _clearCmd;
        cb.CanExecute += new CanExecuteRoutedEventHandler(cb_CanExcute);
        cb.Executed += new ExecutedRoutedEventHandler(cb_Excute);

        // 将命令关联安置在外围控件上
        this.stackPanel.CommandBindings.Add(cb);
    }

    // 当命令送到目标后，此方法被调用
    private void cb_Excute(object sender, ExecutedRoutedEventArgs e)
    {
        Console.WriteLine("cb_Excute OriginalSource: " + (e.OriginalSource as FrameworkElement).Name);
        Console.WriteLine("cb_Excute sender: " + (sender as FrameworkElement).Name);
        this.textBoxA.Clear();
    }

    // 当检测命令是否可以执行时，此方法被调用
    private void cb_CanExcute(object sender, CanExecuteRoutedEventArgs e)
    {
        Console.WriteLine("cb_CanExcute OriginalSource: " + (e.OriginalSource as FrameworkElement).Name);
        Console.WriteLine("cb_CanExcute sender: " + (sender as FrameworkElement).Name);
        if (string.IsNullOrEmpty(this.textBoxA.Text))
        {
            e.CanExecute = false;
        }
        else
        {
            e.CanExecute = true;
        }
        Console.WriteLine(e.CanExecute.ToString());
    }
}
~~~

运行程序，在TextBox中输入文字后Button在命令可执行状态的影响下变为可用，此时单击Button或者按Alt+C键，TextBox都会被清空。

<img src="C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250325144330629.png" alt="image-20250325144330629" style="zoom: 67%;" />

注：

-   使用命令可以避免自己写代码判断Button是否可用以及添加快捷键
-   RoutedCommand是一个与业务逻辑无关的类，只负责在程序中“**跑腿**”而并不对命令目标做任何操作，TextBox并不是由它清空的。对TextBox的清空操作是CommandBinding执行的。因为无论是探测命令是否执行还是命令送达目标，都会激发命令目标发送路由事件，这些路由事件会沿着UI元素树向上传递并最终被CommandBinding所捕捉。本例中CommandBinding被安装在外围的StackPanel上，CommandBinding“站在高处”起一个侦听器的作用，而且专门针对clearCmd命令捕捉与其相关的路由事件。本例中，当CommandBinding捕捉到CanExecute事件就会调用cb_CanExecute方法（判断命令执行的条件是否满足，并反馈给命令供其影响命令源的状态)当捕捉到的是Executed事件（表示命令的Execute方法已经执行了，或说命令已经作用在了命令目标上，RoutedCommand的Execute方法不包含业务逻辑、只负责让命令目标激发Executed),则调用cbExecuted方法
-   因为CanExecute事件的激发频率比较高，为了避免降低性能，在处理完后建议把e.Handled设为true
-   CommandBinding一定要设置在命令目标的外围控件上，不然无法捕捉到CanExecute和Executed等路由事件

#### WPF命令库

命令具有“一处声明、处处使用”的特点，比如Save命令，在程序的任何地方它都表示要求
命令目标保存数据。因此，微软在WPF类库里准备了一些便捷的命令库，这些命令库包括：

-   ApplicationCommands
-   ComponentCommands
-   NavigationCommands
-   MediaCommands
-   EditingCommands

它们都是静态类，而命令就是用这些类的静态只读属性以单件模式暴露出来的。例如：ApplicationCommands类就包含了CancelPrint、Close、ContextMenu、Copy、CorrectionList、Cut、Delete、Find、Help、New、NotACommand、Open、Paste、Print、PrintPreview、Properties、Redo、Replace、Save、SaveAs、SelectAll、Stop、Undo这些命令。

#### 命令参数

命令库中的类大部分使用的是单例模式，这就引出一个问题如果界面上有两个按钮，一个用来新建Teacher的档案，另一个用来新建Student的档案，都使用New命令的话，程序应该如何区别新建的是什么档案呢？

使用命令参数（CommandPrameter）就可以解决。命令源一定是实现了ICommandSource接口的对象，而ICommandSource有一个属性就是CommandPrameter，命令参数是在触发命令时传递给命令的**附加数据**。它是一个 `object` 类型的值，可以是任何类型的数据，如字符串、整数、自定义对象等。命令参数通过 `CommandParameter` 属性设置，该属性可以在命令源（如按钮）上进行设置。

命令参数的作用如下：

-   **提供额外信息**：命令参数可以为命令的执行提供额外的上下文信息。例如，在一个具有多个数据项的列表中，每个数据项对应的 “删除” 按钮可以将该数据项作为命令参数传递给 “删除” 命令。这样，在命令的 `Executed` 事件处理程序中，就可以根据传递的参数来确定要删除的具体数据项。
-   **实现通用命令逻辑**：通过使用命令参数，可以使同一个命令在不同的场景下执行不同的操作。例如，一个 “操作” 命令可以根据传递的不同参数来执行不同的业务逻辑，如根据参数判断是进行添加操作还是修改操作等，从而提高代码的复用性和灵活性。

简单示例：通过相同命令，传入不同的命令参数，产生不同的效果

界面代码：
~~~xaml
<Grid Margin="6">
    <Grid.RowDefinitions>
        <RowDefinition Height="24" />
        <RowDefinition Height="4" />
        <RowDefinition Height="24" />
        <RowDefinition Height="4" />
        <RowDefinition Height="24" />
        <RowDefinition Height="4" />
        <RowDefinition Height="*" />
    </Grid.RowDefinitions>
    <TextBlock
        HorizontalAlignment="Left"
        VerticalAlignment="Center"
        Text="name" />
    <TextBox
        x:Name="nameTextBox"
        Grid.Row="0"
        Margin="60,0,0,0" />
    <Button
        Grid.Row="2"
        Command="New"
        CommandParameter="Teacher"
        Content="New Teacher" />
    <Button
        Grid.Row="4"
        Command="New"
        CommandParameter="Student"
        Content="New Student" />
    <ListBox x:Name="listBoxNewItems" Grid.Row="6" />
</Grid>

<Window.CommandBindings>
    <CommandBinding
        CanExecute="New_CanExecute"
        Command="New"
        Executed="New_Execute" />
</Window.CommandBindings>
~~~

后台命令操作：

~~~c#
  private void New_CanExecute(object sender, CanExecuteRoutedEventArgs e)
  {
      if (string.IsNullOrEmpty(this.nameTextBox.Text))
      {
          e.CanExecute = false;
      }
      else
      {
          e.CanExecute = true;
      }
  }

  private void New_Execute(object sender, ExecutedRoutedEventArgs e)
  {
      string name = this.nameTextBox.Text;
      if (e.Parameter.ToString() == "Teacher")
      {
          this.listBoxNewItems.Items.Add($"New Teacher {name},11451114");
      }
      else if (e.Parameter.ToString() == "Student")
      {
          this.listBoxNewItems.Items.Add($"New Student {name},11451115");
      }
  }
~~~

效果展示：

  <img src="C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250325152328493.png" alt="image-20250325152328493"
    style="zoom: 67%; display: block; margin: 0 auto; " />

#### 在Binding中使用命令

在 WPF 中，使用 `Binding` 将命令与界面元素进行关联

例如：

~~~xaml
<Button x:Name="dynamicCmdBtn" Command="{Binding Path=ppp, Source=sss}" Content="Command" />
~~~

`Command="{Binding Path=ppp, Source=sss}"` 这段代码的作用就是将 `Button` 的 `Command` 属性绑定到 `sss` 对象的 `ppp` 属性所代表的命令实例上。这样，当按钮被点击时，就会执行 `sss` 对象中 `ppp` 命令实例所定义的逻辑。

### 命令详解

为了使程序的结构更加简洁（比如去掉外围的CommandBinding和与之相关的事件处理器)，则需要定义自己的命令





## 模板

在WPF中，通过引入模板（Template）微软将数据和算法的“内容”与“形式”解耦了。WPF中的Template分为两大类：

-   **ControlTemplate** 是算法内容的表现形式，一个控件怎样组织其内部结构才能让它更符合业务逻辑、让用户操作起来更舒服就是由它来控制的。它决定了控件“长成什么样子”，并让程序员有机会在控件原有的内部逻辑基础上扩展自己的逻辑。

-   **DataTemplate** 是数据内容的表现形式，一条数据显示成什么样子，是简单的文本还是直观的图形动画就由它来决定。

一言蔽之，Template就是“外衣”——ControlTemplate是控件的外衣，DataTemplate是数据的外衣。

### Data Template 数据模板

DataTemplate常用的地方有3处，分别是：

-   ContentControl的ContentTemplate属性，相当于给**ContentControl的内容**穿衣服
-   ItemsControl的ItemTemplate属性，相当于给**ItemsControl的数据条目**穿衣服
-   GridViewColumn的CellTemplate属性，相当于给**GridViewColumn单元格里的数据**穿衣服

~~~xaml
<Window.Resources>
    <!--  Conventer  -->
    <entity:AutomakerToPicturePath x:Key="atp" />
    <entity:NameToPicturePath x:Key="ntp" />
    <!--  DataTemplate for Detail View  -->
    <DataTemplate x:Key="carDetailViewTemplate">
        <Border
            BorderBrush="Black"
            BorderThickness="1"
            CornerRadius="6">
            <StackPanel Margin="5">
                <Image
                    x:Name="imagePhoto"
                    Width="400"
                    Height="250"
                    Source="{Binding Name, Converter={StaticResource ntp}}" />
                <StackPanel Margin="5,0" Orientation="Horizontal">
                    <TextBlock FontSize="20" FontWeight="Bold" />
                    <TextBlock
                        x:Name="textBlockName"
                        Margin="5,0"
                        FontSize="20"
                        Text="{Binding Name}" />
                </StackPanel>
                <StackPanel Margin="5,0" Orientation="Horizontal">
                    <TextBlock FontWeight="Bold" Text="Automaker" />
                    <TextBlock
                        x:Name="textBlockAutomaker"
                        Margin="5,0"
                        Text="{Binding Automaker}" />
                    <TextBlock x:Name="Year" FontWeight="Bold" />
                    <TextBlock
                        x:Name="textBlockYear"
                        Margin="5,0"
                        Text="{Binding Year}" />
                    <TextBlock FontWeight="Bold" Text="TopSpeed" />
                    <TextBlock
                        x:Name="textBlockTopToSpeed"
                        Margin="5,0"
                        FontWeight="Bold"
                        Text="{Binding TopSpeed}" />
                </StackPanel>
            </StackPanel>
        </Border>
    </DataTemplate>
    <!--  DataTemplate for Item View  -->
    <DataTemplate x:Key="carListItemView">
        <Grid Margin="2">
            <StackPanel Orientation="Horizontal">
                <Image
                    x:Name="imageLogo"
                    Grid.RowSpan="2"
                    Width="64"
                    Height="64"
                    Source="{Binding Name, Converter={StaticResource ntp}}" />
                <StackPanel Margin="5,10">
                    <TextBlock
                        x:Name="textBlockName"
                        FontSize="16"
                        FontWeight="Bold"
                        Text="{Binding Name}" />
                    <TextBlock
                        x:Name="textBlockYear"
                        FontSize="14"
                        Text="{Binding Year}" />
                </StackPanel>
            </StackPanel>
        </Grid>
    </DataTemplate>
</Window.Resources>
<StackPanel Margin="5" Orientation="Horizontal">
    <UserControl Content="{Binding SelectedItem, ElementName=listBoxCars}" ContentTemplate="{StaticResource carDetailViewTemplate}" />
    <ListBox
        x:Name="listBoxCars"
        Width="180"
        Margin="5,0"
        ItemTemplate="{StaticResource carListItemView}" />
</StackPanel>
~~~

在开发WPF应用程序的过程中，默认控件的外形和行为有时难以直接满足实际的业务需求。在这些场景下，就可以通过使用DataTemplate、ControlTemplate和Style来修改已有控件的外观和行为，甚至定义新控件，从而满足特定的业务需求。

### DataTemplate、ControlTemplate和Style分别是什么？

-   DataTemplate类：

```csharp
public class DataTemplate : System.Windows.FrameworkTemplate
//Inheritance: Object->DispatcherObject->FrameworkTemplate->DataTemplate
```

-   ControlTemplate类：

```csharp
public class ControlTemplate : System.Windows.FrameworkTemplate
//Inheritance: Object->DispatcherObject->FrameworkTemplate->ControlTemplate
```

-   Style类：

```csharp
public class Style : System.Windows.Threading.DispatcherObject, System.Windows.Markup.IAddChild, System.Windows.Markup.INameScope, System.Windows.Markup.IQueryAmbient
//Inheritance: Object->DispatcherObject->Style
```

-   DataTemplate：**它定义了一个数据对象的可视化结构**
-   ControlTemplate：**ControlTemplate实际上是一个脚本，用于创建一组子元素，并绑定到控件提供的属性**
-   Style：**将一组属性值应用于多个元素的渐变方法**

可以看出，这三个类都与WPF界面元素的外观和行为直接相关。

在继承关系方面，DataTemplate类和ControlTemplate类均派生自FrameworkTemplate类，而Style类则更加底层一些，它派生自DispatcherObject类。

它们为什么可以定义WPF页面元素的外观和行为？
WPF应用程序界面中的所有元素都派生自System.Windows名称空间下的FrameworkElement类，并且从这个基类中继承了Style属性，Style属性的值中，包含了对元素若干属性和事件处理器的定义，而它的数据类型就是前文提到的Style class，其定义如下：

~~~c#
public System.Windows.Style Style { get; set; }
~~~

因此可以通过定义一个Style对象，并且将其作为摸一个FramworkElement的Style属性的值，来改变这个控FramworkElement的外观和行为。

此外，在所有界面元素中，有一些特殊元素用于辅助完成业务逻辑，它们通常被称为控件，派生自System.Windows.Controls名称空间下的Control类，并且从这个基类中继承了Template属性，该属性的值定义了控件的外观或布局，而Template属性的数据类型就是前文提到的ControlTemplate class，其在Microsoft官方文档中的定义如下：

~~~c#
public System.Windows.Controls.ControlTemplate Template { get; set; }
~~~

同时有一些特殊的控件，它们内部可以显示一些文本，图片等内容，能够灵活地改变其显示内容的方式，如Label，Button和ListButton。而这些控件派生自System.Windows.Controls名称空间下的ContentControl类（Control类的派生类），并从这个ContentControl类中继承了ContentTemplate属性，该属性的作用是决定ContentControl渲染其包含的文本、图片等内容的方式，而ContentTemplate属性的数据类型就是前文提到的DataTemplate class，其定义如下：

~~~c#
public System.Windows.DataTemplate ContentTemplate { get; set; }
~~~

因此，可以通过定义一个**DataTemplate**对象，并且将其作为某个ContentControl的ContentTemplate属性的值，来改变其展示内部文本、图片等内容的方式。

综上可以得出这些结论：

-   对于WPF应用程序上的任意元素（FramewoekElement派生类），都可以**通过定义其Style属性的值来改变其外观和行为**
-   在所有界面元素中，有一些特殊元素用于辅助完成业务逻辑。它们通常被成为控件（**Control的派生类**），对于所有控件，都可以通过定义其**Style**属性和**Template**属性的值来改变其外观和行为
-   在所有控件中，有一些特殊的空间能够显示文本，图像等内容，并且能够灵活地改变显示内容的的方式，它们被称为内容控件（**ContenControl的派生类**），对于所有的内容控件，都可以通过定义其Style属性、Template属性和ContentTemplate属性的值来改变其外观和行为

尽管有很多Control类的元素并不是ContentControl的派生类，但它们仍然可以显示文本或图像等内容，而且可以灵活改变显示内容的方式（例如TextBox和ItemsControl类元素）这是因为，它们虽然不是ContentControl类的直接派生类，但是它们是由ContentControl的派生类**组装**而成的。

对于TextBox，通过查看内部结构，可以发现它是由一个嵌套着ScrollViewer元素的Border元素构成的，而负责展示内容的就是其中ScrollViewer控件，它是ContentControl的派生类：

```csharp
public class ScrollViewer : System.Windows.Controls.ContentControl
//Inheritance: Object->DispatcherObject->DependencyObject->Visual->UIElement->FrameworkElement->Control->ContentControl->ScrollViewer
```

ItemsControl类元素的情况和TextBox的情况类似，但是更加复杂。在ItemsControl类元素中，真正用于展示内容的控件并不是ItemsControl本身，而是位于ItemsControl.Items集合属性中的若干Item Container，这一点与TextBox是相似的。然而，对于不同的ItemsControl类元素，其Item Container的类型有所区别，但都是ContentControl的直接或简洁派生类。尽管如此，WPF提供了统一的方式来管理Item Container显示数据的方式，即通过定义ItemsControl的ItemTemplate属性来为所有Item Container指定ContentTemplate，从而控制每条数据在界面上的显示方式。Microsoft官方文档中对这两个属性的定义如下：

```csharp
public System.Windows.DataTemplate ItemTemplate { get; set; }
```

此外，还可以通过定义ItemContainerStyle来修改Item Container的Style属性，通过定义Template属性（继承自Control类）来改变ItemsControl的整体外观，以及通过定义ItemsPanel属性修改ItemsControl中布局控件的类型。

```csharp
public System.Windows.Style ItemContainerStyle { get; set; }

public System.Windows.Controls.ItemsPanelTemplate ItemsPanel { get; set; }
```

既然DataTemplate、ControlTemplate和Style类型的对象都可以在一定程度上定义一个WPF界面元素的外观和行为，那么对于如何让定义的外观和行为呈现在程序界面上的过程可以分为以下三类情况进行讨论：

-   针对派生自FrameworkElement类的元素，做法通常是定义一个Style类型的对象，并使用它为FrameworkElement.Style属性赋值
-   在前者的基础上，针对派生自Control类的元素，除了使用Style，还可以定义一个ControlTemplate类型的对象，并使用它为Control.Template属性赋值
-   在前两者的基础上，针对派生自ContentControl类的元素，除了使用Style和ControlTemplate，还可以定义一个DataTemplate类型的对象，并使用它为ContentControl.ContentTemplate属性赋值

#### 使用Style对象对FrameworkElement类的派生类指定Style属性

在派生自Control类的元素之外，如果要举一个派生自FrameworkElement类的元素作为例子，最常见的应当是Border元素。Border类的定义如下：

~~~c#
public class Border : System.Windows.Controls.Decorator
//Inheritance: Object->DispatcherObject->DependencyObject->Visual->UIElement->FrameworkElement->Decorator->Border
~~~

由于Border类不是Control类的派生类，不具备Template和ContentTemplate这两个属性，因此只能考虑使用Style来定义Border的外观和行为，下面是一个例子：

~~~XAML
<Border>
    <Border.Style>
        <Style TargetType="Border">
            <Setter Property="Width" Value="400" />
            <Setter Property="Height" Value="300" />
            <Setter Property="BorderThickness" Value="0.5" />
            <Setter Property="BorderBrush" Value="CornflowerBlue" />
            <Setter Property="CornerRadius" Value="20" />
            <Setter Property="Background">
                <Setter.Value>
                    <LinearGradientBrush StartPoint="0, 0.7" EndPoint="0.3, 1">
                        <GradientStop Offset="0" Color="Red" />
                        <GradientStop Offset="1" Color="Blue" />
                    </LinearGradientBrush>
                </Setter.Value>
            </Setter>
        </Style>
    </Border.Style>
</Border>
~~~





![image-20250318155554612](C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250318155554612.png)

#### 使用ControlTemplate对象对Control类的派生类指定Template属性

由于Control类是FrameworkElement类的派生类，所以前一小节的做法对此类元素依然适用。此外，由于Control类元素拥有Template属性，因此还可以使用ControlTemplate定义它们的外观和行为。除去ContentControl类元素外，Control类中最常见元素应当是TextBox了，其定义如下：

```csharp
public class TextBox : System.Windows.Controls.Primitives.TextBoxBase, System.Windows.Markup.IAddChild
//Inheritance: Object->DispatcherObject->DependencyObject->Visual->UIElement->FrameworkElement->Control->TextBoxBase->TextBox
```

然而，当着手为TextBox定义一个ControlTemplate时，刚开始可能会毫无头绪。这是因为我们没有理解一个问题：当我们在为TextBox定义ControlTemplate时，我们究竟在定义什么？

我们也许可以在TextBox的默认ControlTemplate中找到答案：

~~~XAML
<SolidColorBrush x:Key="TextBox.MouseOver.Border" Color="#FF7EB4EA"/>
<SolidColorBrush x:Key="TextBox.Focus.Border" Color="#FF569DE5"/>

<ControlTemplate TargetType="{x:Type TextBox}">
    <Border x:Name="border" Background="{TemplateBinding Background}" BorderBrush="{TemplateBinding BorderBrush}" BorderThickness="{TemplateBinding BorderThickness}" SnapsToDevicePixels="True">
        <ScrollViewer x:Name="PART_ContentHost" Focusable="false" HorizontalScrollBarVisibility="Hidden" VerticalScrollBarVisibility="Hidden"/>
    </Border>
    <ControlTemplate.Triggers>
        <Trigger Property="IsEnabled" Value="false">
            <Setter Property="Opacity" TargetName="border" Value="0.56"/>
        </Trigger>
        <Trigger Property="IsMouseOver" Value="true">
            <Setter Property="BorderBrush" TargetName="border" Value="{StaticResource TextBox.MouseOver.Border}"/>
        </Trigger>
        <Trigger Property="IsKeyboardFocused" Value="true">
            <Setter Property="BorderBrush" TargetName="border" Value="{StaticResource TextBox.Focus.Border}"/>
        </Trigger>
    </ControlTemplate.Triggers>
</ControlTemplate>
~~~

在这个ControlTemplate中，首先声明了一个名为"border"的Border元素，该Border元素中嵌套了一个名为"PART_ContentHost"的ScrollViewer控件。在后面的代码中，主要是为ControlTemplate.Triggers属性赋值，该属性的定义如下：

```csharp
public System.Windows.TriggerCollection Triggers { get; }
```

从官方文档中的解释可以得知**，Trigger属性的作用是：在某个属性的值发生变化时，指定元素应该有什么样的行为。**在TextBox的默认ControlTemplate中，3个Trigger的作用分别是

-   当TextBox被启用时，令Border的透明度=0.56
-   当鼠标悬在TextBox上方时，令Border的边框颜色为{StaticResource TextBox.MouseOver.Border}
-   当TextBox得到焦点时，令Border的边框颜色为{StaticResource TextBox.Focus.Border}

其中，TextBox.MouseOver.Border和TextBox.Focus.Border是在Resources中定义好的SolidColorBrush对象。

通过分析，可以得知TextBox的默认ControlTemplate做了两件事：

1.  **定义了TextBox由哪些控件组装而成**
2.  **定义TextBox的行为**

因此，若希望修改TextBox的Template属性，可以基于默认的ControlTemplate定义自己的ControlTemplate，例如将外围的Border换成GroupBox，并修改当鼠标悬在TextBox上方时、TextBox得到焦点时GroupBox边框的颜色：

~~~xaml
<Style x:Key="MyTextBox" TargetType="{x:Type TextBox}">
    <Setter Property="Background" Value="{DynamicResource {x:Static SystemColors.WindowBrushKey}}" />
    <Setter Property="BorderBrush" Value="{StaticResource TextBox.Static.Border}" />
    <Setter Property="Foreground" Value="{DynamicResource {x:Static SystemColors.ControlTextBrushKey}}" />
    <Setter Property="BorderThickness" Value="1" />
    <Setter Property="KeyboardNavigation.TabNavigation" Value="None" />
    <Setter Property="HorizontalContentAlignment" Value="Left" />
    <Setter Property="FocusVisualStyle" Value="{x:Null}" />
    <Setter Property="AllowDrop" Value="true" />
    <Setter Property="ScrollViewer.PanningMode" Value="VerticalFirst" />
    <Setter Property="Stylus.IsFlicksEnabled" Value="False" />
    <Setter Property="Template">
        <Setter.Value>
            <ControlTemplate TargetType="{x:Type TextBox}">
                <GroupBox
                    x:Name="groupbox"
                    Background="{TemplateBinding Background}"
                    BorderBrush="{TemplateBinding BorderBrush}"
                    BorderThickness="{TemplateBinding BorderThickness}"
                    Header="{TemplateBinding Text}"
                    SnapsToDevicePixels="True">
                    <ScrollViewer
                        x:Name="PART_ContentHost"
                        Focusable="False"
                        HorizontalScrollBarVisibility="Hidden"
                        VerticalScrollBarVisibility="Hidden" />
                </GroupBox>
                <ControlTemplate.Triggers>
                    <Trigger Property="IsEnabled" Value="false">
                        <Setter TargetName="groupbox" Property="Opacity" Value="0.56" />
                    </Trigger>
                    <Trigger Property="IsMouseOver" Value="true">
                        <Setter TargetName="groupbox" Property="BorderBrush" Value="{StaticResource TextBox.MouseOver.Border}" />
                    </Trigger>
                    <Trigger Property="IsKeyboardFocused" Value="true">
                        <Setter TargetName="groupbox" Property="BorderBrush" Value="{StaticResource TextBox.Focus.Border}" />
                    </Trigger>
                </ControlTemplate.Triggers>
            </ControlTemplate>
        </Setter.Value>
    </Setter>
    <Style.Triggers>
        <MultiTrigger>
            <MultiTrigger.Conditions>
                <Condition Property="IsInactiveSelectionHighlightEnabled" Value="true" />
                <Condition Property="IsSelectionActive" Value="false" />
            </MultiTrigger.Conditions>
            <Setter Property="SelectionBrush" Value="{DynamicResource {x:Static SystemColors.InactiveSelectionHighlightBrushKey}}" />
        </MultiTrigger>
    </Style.Triggers>
</Style>
	
<StackPanel>
    <TextBox
        Margin="10"
        Style="{DynamicResource MyTextBox}"
        Text="114514" />
    <TextBox Margin="10" />
</StackPanel>                       
 
~~~

![image-20250318162149634](C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250318162149634.png)

#### 使用DataTemplate对象为ContentControl类的派生类指定ContentTemplate属性

在ContentControl族的控件中，最常用的当属Button了，Button类的其定义如下

```csharp
public class Button : System.Windows.Controls.Primitives.ButtonBase
//Inheritance->Object->DispatcherObject->DependencyObject->Visual->UIElement->FrameworkElement->Control->ContentControl->ButtonBase->Button
```

根据Microsoft对DataTemplate的解释可知，DataTemplate用于定义一个数据对象的可视化结构。既然DataTemplate是面向数据对象的，那它与控件又有什么联系呢？其实，一个数据对象的可视化**必需依赖一个载体**，在WPF中，这个载体就是可以显示文字、图像等内容的控件，即ContentControl。可以通过把数据对象赋值给ContentControl的Content属性，来让ContentControl显示这个数据对象。例如，当我们将一个字符串"Click 114514"赋给Button的Content属性时，这条字符串会在Button内显示出来，如下图所示：

![image-20250318163027661](C:\Users\b3q\AppData\Roaming\Typora\typora-user-images\image-20250318163027661.png)

看完Button默认的Style后，可能有两个疑问：

1.  Button究竟把Content显示在了哪里？
2.  在Button默认的Style中，并没有为其定义ContentTemplate属性，那么Button是按照什么方式显示Content的？

实际上，它们的答案就在ControlTemplate中包含的ContentPresenter中。在每一个ContentControl的默认ControlTemplate中，都有一个ContenPresenter元素，它的作用是获取ContentControl的ContentTemplate属性值，并以ContentTemplate属性值规定的形式将Content显示在自己位于ControlTemplate中的位置。**若没有为ContentControl指定ContentTemplate属性**，ContentPresenter 调用 Content 的 ToString 方法，并创建一个**TextBlock**来包装ToString方法的返回值，最后将 TextBlock 显示出来。这便是刚才在Button中无法正常显示图片的原因。

要想显示出图片需要设置ContentTemplate

~~~xaml
  <Style x:Key="FocusVisual">
      ...
   <Setter Property="Template">
          <Setter.Value>
              <ControlTemplate TargetType="{x:Type Button}">
                  <Border
                      x:Name="border"
                      Background="{TemplateBinding Background}"
                      BorderBrush="{TemplateBinding BorderBrush}"
                      BorderThickness="{TemplateBinding BorderThickness}"
                      SnapsToDevicePixels="true">
                      <ContentPresenter
                          x:Name="contentPresenter"
                          Margin="{TemplateBinding Padding}"
                          HorizontalAlignment="{TemplateBinding HorizontalContentAlignment}"
                          VerticalAlignment="{TemplateBinding VerticalContentAlignment}"
                          Focusable="False"
                          RecognizesAccessKey="True"
                          SnapsToDevicePixels="{TemplateBinding SnapsToDevicePixels}" />
                  </Border>
                  <ControlTemplate.Triggers>
                      <Trigger Property="IsDefaulted" Value="true">
                          <Setter TargetName="border" Property="BorderBrush" Value="{DynamicResource {x:Static SystemColors.HighlightBrushKey}}" />
                      </Trigger>
                      <Trigger Property="IsMouseOver" Value="true">
                          <Setter TargetName="border" Property="Background" Value="{StaticResource Button.MouseOver.Background}" />
                          <Setter TargetName="border" Property="BorderBrush" Value="{StaticResource Button.MouseOver.Border}" />
                      </Trigger>
                      <Trigger Property="IsPressed" Value="true">
                          <Setter TargetName="border" Property="Background" Value="{StaticResource Button.Pressed.Background}" />
                          <Setter TargetName="border" Property="BorderBrush" Value="{StaticResource Button.Pressed.Border}" />
                      </Trigger>
                      <Trigger Property="IsEnabled" Value="false">
                          <Setter TargetName="border" Property="Background" Value="{StaticResource Button.Disabled.Background}" />
                          <Setter TargetName="border" Property="BorderBrush" Value="{StaticResource Button.Disabled.Border}" />
                          <Setter TargetName="contentPresenter" Property="TextElement.Foreground" Value="{StaticResource Button.Disabled.Foreground}" />
                      </Trigger>
                  </ControlTemplate.Triggers>
              </ControlTemplate>
          </Setter.Value>
      </Setter>
      <Setter Property="ContentTemplate">
          <Setter.Value>
              <DataTemplate>
                  <StackPanel Orientation="Vertical">
                      <Label Content="{Binding}" />
                      <Image Source="{Binding}" Stretch="Fill" />
                  </StackPanel>
              </DataTemplate>
          </Setter.Value>
      </Setter>
      ...
  </Style>

<Grid>
    <Button
        Margin="10"
        Content="/Icon/pic_lbjn2.jpg"
        Cursor="Hand"
        Style="{DynamicResource ButtonCanShowPicture}" />
</Grid>
~~~



