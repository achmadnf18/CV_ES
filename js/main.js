$(function(){
    $("#form-total").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        enablePagination: true,
        autoFocus: true,
        transitionEffectSpeed: 200,
        titleTemplate : '<div class="title">#title#</div>',
        labels: {
            previous : 'Back',
            next : 'Next',
            finish : 'Confirm',
            current : ''
        },
        onStepChanging: function (event, currentIndex, newIndex) { 
            var classification = {
                operational: {
                    education: {
                        d3: 75, s1: 100,s2: 25,s3: 25
                    },
                    experience: {
                        0: 50, 1: 75, 2:100, 3:100, 4:100, 5:100, 6:100, 7:100, 8:100, 9:100, 10:100
                    }
                },
                management: {
                    education: {
                        d3: 25, s1: 75,s2: 100,s3: 100
                    },
                    experience: {
                        0: 0, 1: 0, 2:0, 3:50, 4:50, 5:100, 6:100, 7:100, 8:100, 9:100, 10:100
                    }
                },
                top: {
                    education: {
                        d3: 25, s1: 25,s2: 75,s3: 100
                    },
                    experience: {
                        0: 0, 1: 0, 2:0, 3:0, 4:0, 5:75, 6:85, 7:90, 8:95, 9:95, 10:100
                    }
                }
            };

            var skillset= $('#skillset').val() || '';
            var skill_len= skillset.split(',').length;
            if(skillset == '') skill_len = 0;

            var job= $('#job option:selected').val();
            var job_name= $('#job option:selected').text();
            var education= $('#education option:selected').val();
            var experience= $('#experience option:selected').val();
            var experience_name= $('#experience option:selected').text();

            var ed_score= classification[job].education[education];
            var exp_score= classification[job].experience[experience];
            var skill_score= skill_len * 100;

            var cv_score= (ed_score * (30/100)) + (exp_score * (50/100)) + (((skill_score * (20/100))/100) * 20);
            var cv_status= 'Not Recommended';
            $('#cv-status').css({'color':'#ed6464;'});
            if(parseFloat(cv_score) >= 75){
                $('#cv-status').css({'color':'#5beb7d;'});
                cv_status= 'Recommended';
            } 
            $('#job-val').text(job_name.toUpperCase());
            $('#education-val').text(education.toUpperCase() + ' (Score: '+ ed_score +')');
            $('#experience-val').text(experience_name.toUpperCase() + ' (Score: '+ exp_score +')');
            $('#skillset-val').text(skillset.toUpperCase() + ' (Score: '+ skill_score +')');
            $('#cv-status').text(cv_status + ' (Score: ' + cv_score +')');


            var $next = $('li').has( "a[href='#next']");
            $next.attr("style","display: inherit !important;");

            return true;
        }
    });
    $("#day").datepicker({
        dateFormat: "MM - DD - yy",
        showOn: "both",
        buttonText : '<i class="zmdi zmdi-chevron-down"></i>',
    });
});
