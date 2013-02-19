using Cykel.Ember.Models;
using Cykel.Ember.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Cykel.Ember.Controllers
{
    public class StationsController : ApiController
    {
        private readonly IDbContext _dbContext;

        public StationsController(IDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public object Get()
        {
            return new
            {
                Stations = this._dbContext.Stations.GetAll()
            };
        }

        public object Get(string id)
        {
            return new
            {
                Station = this._dbContext.Stations.Get(id)
            };
        }
    }
}
