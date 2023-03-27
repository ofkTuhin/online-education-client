const Menuitems = [
  {
    title: "Admin",
    icon: "user",
    href: "/admin",
    value: "admin",
    admin: true,
  },
  {
    title: "Teacher",
    icon: "disc",
    href: "/teacher",
    value: "teacher",
    teacher: true,
  },
  {
    title: "Student",
    icon: "disc",
    href: "/student",
    value: "student",
    student: true,
  },
  {
    title: "All Student",
    icon: "disc",
    href: "/all-students",
    value: "students",
    admin: true,
  },
  {
    title: "All teachers",
    icon: "disc",
    href: "/all-teachers",
    value: "teachesrs",
    admin: true,
  },
  {
    title: "tutorials",
    icon: "book",
    href: "/tutorials",
    value: "tutorials",
    admin: true,
    teacher: true,
    student: true,
  },

  {
    title: "All Tutoreals",
    icon: "video",
    href: "/all-tutorials",
    value: "all-tutorials",
    admin: true,
  },
  {
    title: "documents",
    icon: "book",
    href: "/documents",
    value: "documents",
    admin: true,
    teacher: true,
    student: true,
  },
  {
    title: "Asssignment",
    icon: "book",
    href: "/assignment",
    value: "assignment",
    admin: true,
    teacher: true,
    student: true,
  },
  {
    title: "skill",
    icon: "book",
    href: "/skill",
    value: "skill",
    admin: true,
    teacher: true,
    student: true,
  },
];

export default Menuitems;
