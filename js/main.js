<!--变量-->

            var operation = new Array([100]); 
            var num = new Array([100]); 
            for(i = 0 ; i < 100 ; i++){
                operation[i] = null;
                num[i] = null;
            }
            var apoint = null;
            var result = null;
            var screen_result = 0; 
            var show = null;
            var equa = null;
            var step = 0;
            var i = 0;
            var j = 0;
            var a = 0;
            var stop = 1;

 <!--数字按键-->   
    function number(n){           
                    if(apoint)                                             <!--num[step]有小数点-->
                            num[step]=num[step].toString()+n;              
                    else{                                                  <!--num[step]没有小数点-->
                        if(num[step] == null)
                            num[step]=parseInt(num[step]+n);
                        else
                            num[step]=parseInt(num[step].toString()+n);     <!--避免出现输入类似“00001”或者"000002"的数字-->
                        }
                    if(step == 0)                                           
                        screen_result = num[step];
                    else 
                        for( i = 0 ,screen_result = null ; i < step+1  ; i++ ){                              
                            if(!operation[i]){
                                if (screen_result == null )
                                    screen_result = num[i];
                                else
                                    screen_result = screen_result + num[i];
                            }
                            else if (screen_result == null )
                                screen_result = num[i] + operation[i]; 
                            else 
                                screen_result = screen_result + num[i] + operation[i]; 
                                
                        }
                        screenshow(screen_result);                
    }
       
<!--小数点按键--> 
    function point(){
            if(!apoint){                                                      <!--该数字还没有小数点时才能加小数点-->
                apoint = ".";                                                 <!--point 赋值-->
                    if(num[step])                                             <!--num[step]不为 0 或 null -->
                        num[step] = num[step].toString() + ".";
                    else                                                      <!--num[step] 为 0 或 null -->
                        num[step] = 0 + ".";
                }                
            if(step == 0)                                           <!--step == 0 时输出没有小数点-->
                        screen_result = num[step];
            else for( i = 0 ,screen_result = null ; i < step+1  ; i++ ){                              
                            if(!operation[i])
                                if (screen_result == null )
                                    screen_result = num[i];
                                else
                                    screen_result = screen_result + num[i];
                            else
                                if (screen_result == null )
                                    screen_result = num[i] + operation[i]; 
                                else 
                                    screen_result = screen_result + num[i] + operation[i]; 
                        }
                        screenshow(screen_result); 
    }
    
 
<!--运算符按键-->
    function operation_(n){
        if(step == 0){                              <!--step为0-->
            if(!equa){                             <!--之前没有执行=号-->
                if( !num[step] ){                   <!--num[step]==null或者0-->
                    num[step] = 0 ;
                }
            }
            else if(num[step] == null){             <!--之前有执行=号,且num[step]为null时-->
                num[step] = result;                 <!--将=号执行玩完后的结果赋值给num[step]-->   
            }
            operation[step] = n;                    <!--operation赋值n-->      
        }
        else if(num[step] !==null){                 <!--当之前没有执行=号-->
            operation[step] = n ;
        }
        else 
            operation[step - 1] = n ;
        if(step == 0 || num[step] !==null)
            step++;
        for( i = 0 ,screen_result = null ; i < step  ; i++ ){
            if(screen_result == null)
                screen_result = num[i] + operation[i];
            else
                screen_result = screen_result + num[i] + operation[i];         
        }
        screenshow(screen_result);   
        equa = null;
        apoint = null;
    }

<!--0不能被除的提示-->  
    function warn_zero(){
        alert("0不能做除数");        
    }
        
<!--等于号按键-->   
    function equal(){ 
        if(!equa){
            if(step >0 && num[step] == null){           <!--在执行 = 号之前，最后一个单位是运算符（ + - * ÷ ）而不是数字的时候把该运算符去掉-->
                operation[step-1] == null;
                step--;
            }
            for(i = 0 ; i < step ; i++){
                if(operation[step-i-1] == "÷"){
                    if(parseFloat(num[step-i-1+1]) == 0)
                        stop = 0;
                }
            }
            if(stop==1){
                for(i = 0 ; i < step ; i++){                                                    <!--执行乘法-->                        
                    if(operation[i] == "×"){
                        if( parseInt(num[i]) == parseFloat(num[i]) &&                    
                            parseInt(num[i+1]) == parseFloat(num[i+1]) )   
                          num[i] = parseInt(num[i]) * parseInt(num[i+1]);
                        else
                          num[i] = parseFloat(num[i]) * parseFloat(num[i+1]);         
                        for(j = 0; j < step-i-2+1 ; j++)
                        {
                            operation[i+j]  = operation[i+1+j];
                            operation[i+1+j] = null;
                            num[i+1+j]  = num[i+2+j];              
                            num[i+2+j] = null;
                        }
                        i--;
                        if(step == i+2)
                            break;
                    }
                    if(operation[i] == "÷"){                                                    <!--执行除法-->
                        if( parseInt(num[i]) == parseFloat(num[i]) &&                    
                            parseInt(num[i+1]) == parseFloat(num[i+1]) )   
                          num[i] = parseInt(num[i]) / parseInt(num[i+1]);
                        else
                          num[i] = parseFloat(num[i]) / parseFloat(num[i+1]);         
                        for(j = 0; j < step-i-2+1 ; j++)
                        {
                            operation[i+j]  = operation[i+1+j];
                            operation[i+1+j] = null;
                            num[i+1+j]  = num[i+2+j];              
                            num[i+2+j] = null;
                        }
                        i--;
                        if(step == i+2)
                            break;                   
                    } 
                }
                

                
                for(i = 0 ; i < step ; i++){                                                    <!--执行加法-->                        
                    if(operation[i] == "+"){
                        if( parseInt(num[i]) == parseFloat(num[i]) &&                   
                            parseInt(num[i+1]) == parseFloat(num[i+1]) )   
                          num[i] = parseInt(num[i]) + parseInt(num[i+1]);
                        else
                          num[i] = parseFloat(num[i]) + parseFloat(num[i+1]);         
                        for(j = 0; j < step-i-2+1 ; j++)
                        {
                            operation[i+j]  = operation[i+1+j];
                            operation[i+1+j] = null;
                            num[i+1+j]  = num[i+2+j];              
                            num[i+2+j] = null;
                        }
                        i--;
                        if(step == i+2)
                            break;
                    }
                    if(operation[i] == "-"){                                                    <!--执行减法-->
                        if( parseInt(num[i]) == parseFloat(num[i]) &&                    
                            parseInt(num[i+1]) == parseFloat(num[i+1]) )   
                          num[i] = parseInt(num[i]) - parseInt(num[i+1]);
                        else
                          num[i] = parseFloat(num[i]) - parseFloat(num[i+1]);         
                        for(j = 0; j < step-i-2+1 ; j++)
                        {
                            operation[i+j]  = operation[i+1+j];
                            operation[i+1+j] = null;
                            num[i+1+j]  = num[i+2+j];              
                            num[i+2+j] = null;
                        }
                        i--;
                        if(step == i+2)
                            break;                    
                    } 
                }
                            
                if(num[0] !== null)
                {
                    if(parseInt(num[0]) == parseFloat(num[0]))
                        result = parseInt(num[0]);
                    else
                        result = parseFloat(num[0]);
                    screen_result = result; 
                    screenshow(screen_result);
                    step = 0;
                    apoint = null;
                    for(i = 0 ; i < 100 ; i++)
                     {
                         operation[i] = null;
                         num[i] = null;
                     }
                    equa = "=";
                }
            }
            else
                warn_zero();
        }       
    }
        
        
<!--归零按键-->
    function clean(){
         for(i = 0 ; i < 100 ; i++)
         {
             operation[i] = null;
             num[i] = null;
         }
         j = 0;
         i = 0;
         step = 0;
         equa = null;
         apoint = null;
         result = null;
         show = null; 
         stop = 1;
         screen_result = 0;
         screenshow(screen_result);
    }
    
    
    
<!--退格--> 
    function back(){
        if(step == 0){                                                                      <!--step == 0 时，可能是刚执行完 = 号，也可能是刚输入第一位数num[0] -->  
            if( num[step] == null )                                                         <!--刚执行完 = 号-->
                clean();                                                        
            else if((num[step].toString()).length == 1)                                     <!--num[0]只有一位数而已，退格将变为0-->
                num[step] = 0;
            else if((num[step].toString()).substring((num[step].toString()).length-1) == "."){                       
                num[step] = (num[step].toString()).substring(0,(num[step].toString()).length-1); 
                apoint = null;                                                                      <!--删除掉apoint-->                           
            }
            else
                num[step] = (num[step].toString()).substring(0,(num[step].toString()).length-1);    <!--num[0]超过一位数-->
        }
        else {                                                                                      <!-- step > 0 , 即是有至少一个运算符（ + - * ÷ ）的时候-->
            if(num[step] !== null){
                if((num[step].toString()).length == 1)                        <!--此时step>0 ，num[step]不是第一个数，且当num[step]只有一位数，退格将变为null-->
                    num[step] = null;
                else if((num[step].toString()).substring((num[step].toString()).length-1) == ".") <!--num[step]不只一位数-->     
                    {
                     num[step] = (num[step].toString()).substring(0,(num[step].toString()).length-1); 
                     apoint = null;                                                               <!--删除掉apoint--> 
                    }
                else
                    num[step] = (num[step].toString()).substring(0,(num[step].toString()).length-1); 
            }
            else {                                                                             <!--num[step]为null ， 退格将删除掉运算符 operation[step-1]-->
                operation[step-1] = null;
                step--;
            }       
        }                                                
            for( i = 0 ,screen_result = null ; i < step+1  ; i++ ){                            <!--输出过程中防止 "字符串" + null 导致输出异常的情况--> 
                if(!operation[i]){
                    if (screen_result == null )
                        screen_result = num[i];
                    else if (num[i]!==null) 
                        screen_result = screen_result + num[i];
                }
                else if (screen_result == null )
                    screen_result = num[i] + operation[i]; 
                else 
                    screen_result = screen_result + num[i] + operation[i];
            }
       
        screenshow(screen_result);     
    }
    
    
    
<!--屏幕显示-->
    function screenshow(n){
        show = n.toString();
        if(show.length < 9 || show.length == 9  ){ 
            if(a !== 0){
                $("#screen_1").animate({'left':'7px', 'text-align':'right','font-size':'30','top':'115','width':'240',},150);
                a = 0;
            }
            $("#screen_1").html(show);
            
        }
        else if(show.length < 21 && show.length > 9  ){ 
            if(a !== 1){
                $("#screen_1").animate({'left':'8px', 'text-align':'left','font-size':'30','top':'80','width':'240',},150);
                a = 1;
            }
            $("#screen_1").html(show);
            
        }
        else if(show.length < 31 && show.length > 20  ){ 
            if(a !== 2){
                $("#screen_1").animate({'left':'8px', 'text-align':'left','font-size':'30','top':'45','width':'240',},150);
                a = 2;
            }
            $("#screen_1").html(show);
            
        }
        else if(show.length < 50 && show.length > 30  ){
            if(a !== 3){
                $("#screen_1").animate({'left':'11px', 'text-align':'left','font-size':'20','top':'34','width':'228',},300);
                a = 3;
            }
            $("#screen_1").html(show);
        }
        else if(show.length < 181 && show.length > 49  ){
            if(a !== 4){
                $("#screen_1").animate({'left':'8px', 'text-align':'left','font-size':'14','top':'8','width':'235',},300);
                a = 4;
            }
            $("#screen_1").html(show);
        }
    }



