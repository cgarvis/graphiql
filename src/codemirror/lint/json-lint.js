/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE-examples file in the root directory of this source tree.
 */

import CodeMirror from 'codemirror';
import { jsonLint } from './jsonLint';


CodeMirror.registerHelper('lint', 'json', text => {
  var err = jsonLint(text);
  if (err) {
    return [ {
      message: err.message,
      severity: 'error',
      from: getLocation(text, err.start),
      to: getLocation(text, err.end)
    } ];
  }
  return [];
});

function getLocation(source, position) {
  var line = 0;
  var column = position;
  var lineRegexp = /\r\n|[\n\r]/g;
  var match;
  while ((match = lineRegexp.exec(source)) && match.index < position) {
    line += 1;
    column = position - (match.index + match[0].length);
  }
  return CodeMirror.Pos(line, column);
}
