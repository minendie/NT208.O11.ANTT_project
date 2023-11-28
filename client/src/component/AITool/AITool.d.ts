// This file is to convert JSX components to TSX

import React from 'react';

declare module '*.jsx' {
  var _: React.ElementType<any>;
  export default _;
}