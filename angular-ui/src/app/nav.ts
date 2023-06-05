interface NavAttributes {
  [propName: string]: any;
}

interface NavWrapper {
  attribute: NavAttributes;
  element: string;
}

interface NavBadge {
  text: string;
  variant: string;
}

interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  showHide?: boolean;
  children?: any;
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: string;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    showHide: false,
    name: 'Dashboard',
    url: '/dashboard',
    class: '',
    icon: 'icon-speedometer',
  },
  {
    showHide: false,
    name: 'AMW Users',
    url: '/users',
    icon: 'fa fa-list',
    class: '',
  }
];
