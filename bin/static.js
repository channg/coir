require( "colors")


module.exports.log =[
  '[ Init      package ]'.gray,//0
  '[ Download  package ]'.gray,//1
  '[ Extract   package ]'.gray,//2
  '[      Compile      ]'.gray,//3
  '[      Building     ]'.gray,//4
  '[ Clear      cache  ]'.gray,//5
  '[ Use        cache  ]'.gray,//6
  '[ Download to cache ]'.gray,//7
  '[   Coir      link  ]'.gray//8
]


module.exports.init = ` ______       ______       ________      ______
/_____/\\     /_____/\\     /_______/\\    /_____/\\
\\:::__\\/     \\:::_ \\ \\    \\__.::._\\/    \\:::_ \\ \\
 \\:\\ \\  __    \\:\\ \\ \\ \\      \\::\\ \\      \\:(_) ) )_
  \\:\\ \\/_/\\    \\:\\ \\ \\ \\     _\\::\\ \\__    \\: __ \`\\ \\
   \\:\\_\\ \\ \\    \\:\\_\\ \\ \\   /__\\::\\__/\\    \\ \\ \`\\ \\ \\
    \\_____\\/     \\_____\\/   \\________\\/     \\_\\/ \\_\\/
                                                      `.gray